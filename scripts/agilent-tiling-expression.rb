require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"
DESIGN_FOLDER = ARRAY_SHARE + "/Agilent/designs"

# message that gets passed back to UI
message_file = File.open("message.log", "w")

begin
  # hackish way of dealing with JSON gunk
  json_string = ARGV.join(" ")[1..-3]

  begin
    microarrays = JSON.parse(json_string)
  rescue Exception => e
    raise "Unable to parse JSON: #{e}"
  end

  conditions = Hash.new
  microarrays.each do |microarray|
    name = microarray["name"].gsub(/\|/,'-')

    samples = name.split(/_v_/)
    condition = samples.sort.join("_v_")
    direction = name == condition ? "f" : "r"

    conditions[condition] ||= Array.new
    conditions[condition] << {
      :file_path => microarray["raw_data_path"],
      :direction => direction
    }
  end
    
  # generate a script and then run the whole job as one command
  script = File.open("run.sh", "w")

  conditions.each do |condition, replicates|
    ft = File.open("#{condition}.ft", "w")

    replicate_number = 1
    replicates.each do |replicate|
      file_path = replicate[:file_path]

      #complain if the path isn't under the ARRAY_SHARE
      if !file_path.include?(ARRAY_SHARE) || file_path.include?("..")
        raise "Path #{file_path} must lie under #{ARRAY_SHARE}"
      end

      # annotations
      file_base = File.basename(file_path, ".txt")
      design_id = /^\d{2}(\d{5})/.match(file_base)[1]

      map_file = Dir.glob(DESIGN_FOLDER + "/*#{design_id}*/*.map").first
      locus_file = Dir.glob(DESIGN_FOLDER + "/*#{design}*/*locus_probes.txt").first

      #convert Feature Extraction to AnalyzerDG format
      analyzerdg_file = file_base + ".csv"
      script << "/tools/bin/perl #{ARRAY_SHARE}/Agilent/core/bin/agilentFE2color2analyzerdg.pl #{file_path} #{analyzerdg_file}\n"

      # preprocess
      rep_file = file_base + ".rep"
      script << "/tools/java/jdk/bin/java -Xmx512M -jar #{ARRAY_SHARE}/bin/preprocess.jar -q #{analyzerdg_file} -m #{map_file} -o #{rep_file} -i -n median\n"

      # group probes
      grouped_rep_file = file_base + ".grouped.rep"
      script << "/tools/bin/ruby #{ARRAY_SHARE}/bin/probe_grouper.rb #{rep_file} #{locus_file} #{grouped_rep_file}\n"

      # ft
      ft << "#{grouped_rep_file} #{replicate[:direction]} #{replicate_number}\n"

      replicate_number += 1
    end

    ft.close

    # mergeReps
    script << "#{ARRAY_SHARE}/bin/mergeReps -opt 3 #{condition}.ft #{condition}.opt.merge\n"
    script << "#{ARRAY_SHARE}/bin/mergeReps #{condition}.ft #{condition}.all.merge\n"

    # VERA
    script << "#{ARRAY_SHARE}/bin/VERA #{condition}.opt.merge #{condition}.model\n"

    # SAM
    script << "#{ARRAY_SHARE}/bin/SAM #{condition}.all.merge #{condition}.model #{condition}.sig\n"
  end

  script.close
  system("sh run.sh")

  zip_file = "VERA-SAM_#{Time.now.strftime("%Y-%m-%d")}"

  `zip #{zip_file} *rep *ft *merge *model *sig`
rescue Exception => e
  message_file << e.to_s
end
