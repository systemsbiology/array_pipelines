#!/tools/bin/ruby

require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"
DESIGN_FOLDER = ARRAY_SHARE + "/Agilent/designs"
EXCLUDE_FILE = ARRAY_SHARE + "/Pipeline/tools/etc/excluded_gene_names"

# message that gets passed back to UI
message_file = File.open("message.log", "w")

#begin
  json_file = File.open("form.dat", "r")
  json_string = json_file.read
  json_string = /(.*?)=?$/.match(json_string)[1]

  begin
    job = JSON.parse(json_string)
  rescue Exception => e
    raise "Unable to parse JSON:\n" +
      "Error: #{e}\n" +
      "JSON string: #{json_string}\n"
  end

  conditions = Hash.new
  job["microarrays"].each do |microarray|
    name = microarray["name"].gsub(/\|/,'-')

    samples = name.split(/_v_/)
    reversed_name = "#{samples[1]}_v_#{samples[0]}"

    if conditions.has_key? reversed_name
      condition = reversed_name
      direction = "r"
    else
      condition = name
      direction = "f"
    end

    conditions[condition] ||= Array.new
    conditions[condition] << {
      :file_path => microarray["raw_data_path"],
      :direction => direction
    }
  end
    
  # generate a script and then run the whole job as one command
  script = File.open("run.sh", "w")

  feature_extraction_files = Array.new
  conditions.each do |condition, replicates|
    ft = File.open("#{condition}.ft", "w")

    replicate_number = 1
    replicates.each do |replicate|
      file_path = replicate[:file_path]
      system("ln -s #{file_path}")
      feature_extraction_files << File.basename(file_path)

      #complain if the path isn't under the ARRAY_SHARE
      if !file_path.include?(ARRAY_SHARE) || file_path.include?("..")
        raise "Path #{file_path} must lie under #{ARRAY_SHARE}"
      end

      # annotations
      file_base = File.basename(file_path, ".txt")
      design_id = /^\d{2}(\d{5})/.match(file_base)[1]

      map_file = Dir.glob(DESIGN_FOLDER + "/*#{design_id}*/*.map").first
      locus_file = Dir.glob(DESIGN_FOLDER + "/*#{design_id}*/*locus_probes.txt").first

      #convert Feature Extraction to AnalyzerDG format
      analyzerdg_file = file_base + ".csv"
      script << "/tools/bin/perl #{ARRAY_SHARE}/Agilent/core/bin/agilentFE2color2analyzerdg.pl #{file_path} #{analyzerdg_file}\n"

      # preprocess
      rep_file = file_base + ".rep"
      script << "/tools/java/jdk/bin/java -Xmx1024M -jar #{ARRAY_SHARE}/bin/preprocess.jar -q #{analyzerdg_file} -m #{map_file} -o #{rep_file} -i -n median\n"

      if locus_file
        # group probes
        grouped_rep_file = file_base + ".grouped.rep"
        script << "/tools/bin/ruby #{ARRAY_SHARE}/bin/probe_grouper.rb #{rep_file} #{locus_file} #{grouped_rep_file}\n"

        ft << "#{grouped_rep_file} #{replicate[:direction]} #{replicate_number}\n"
      else
        # file table without probe grouping
        ft << "#{rep_file} #{replicate[:direction]} #{replicate_number}\n"
      end

      replicate_number += 1
    end

    ft.close

    # mergeReps
    script << "#{ARRAY_SHARE}/bin/mergeReps -opt 3 -exclude #{EXCLUDE_FILE} #{condition}.ft #{condition}.opt.merge\n"
    script << "#{ARRAY_SHARE}/bin/mergeReps -exclude #{EXCLUDE_FILE} #{condition}.ft #{condition}.all.merge\n"

    # VERA
    script << "#{ARRAY_SHARE}/bin/VERA #{condition}.opt.merge #{condition}.model\n"

    # SAM
    script << "#{ARRAY_SHARE}/bin/SAM #{condition}.all.merge #{condition}.model #{condition}.sig\n"
  end

  # mergeConds
  script << "#{ARRAY_SHARE}/bin/mergeConds -out matrix_output -conds *.sig\n"

  script.close
  system("sh run.sh")

  result_files = feature_extraction_files + Dir.glob("*rep *ft *merge *model *sig matrix_output")
  zip_file = "VERA-SAM_#{Time.now.strftime("%Y-%m-%d")}"

  `zip #{zip_file} #{result_files.join(" ")}`

  #begin
    require File.expand_path(File.dirname(__FILE__) + '/agilent-tiling-expression-postrun')
    postrun(result_files, job["email"])
  #rescue StandardError => e
  #  puts "Failed to do postrun task: #{e.message}"
  #end
#rescue Exception => e
#  message_file << e.to_s
#end
