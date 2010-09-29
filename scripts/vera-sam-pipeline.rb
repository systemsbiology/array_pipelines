require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"
GAL_FOLDER = ARRAY_SHARE + "/Legacy/ExiqonGAL"

#raise "vera-sam-pipeline.rb expects a single JSON string argument" unless ARGV.size == 1

# hackish way of dealing with JSON gunk
json_string = ARGV.join(" ")[1..-3]

begin
  microarrays = JSON.parse(json_string)
rescue Exception => e
  raise "Unable to parse JSON: #{e}"
end

# load in the slide-to-annotation mappings
begin
  yaml = YAML.load(File.new(GAL_FOLDER + "/slide-to-annotations.yml"))

  mappings = Array.new
  yaml.each do |slide_range, gal_file|
    slides = slide_range.split(/-/)
    mappings << {
      :start_slide => slides[0].to_i,
      :end_slide => slides[1].to_i,
      :gal_file => gal_file
    }
  end
rescue Exception => e
  raise "Unable to load the slide-to-annotation mapping file: #{e}"
end

# generate a script and then run the whole job as one command
script = File.open("run.sh", "w")

microarrays.each do |microarray|
  file_path = microarray["raw_data_path"]
  condition = microarray["name"]

  #complain if the path isn't under the ARRAY_SHARE
  if !file_path.include?(ARRAY_SHARE) || file_path.include?("..")
    raise "Path #{file_path} must lie under #{ARRAY_SHARE}"
  end

  # annotations
  file_base = File.basename(file_path, ".csv")
  slide_number = file_base.to_i
  gal_file = nil
  mappings.each do |mapping|
    if slide_number >= mapping[:start_slide] && slide_number <= mapping[:end_slide]
      gal_file = GAL_FOLDER + "/" + mapping[:gal_file]
    end
  end
  script << "/tools/bin/perl /net/arrays/Legacy/Core/bin/gal2map.pl --gal #{gal_file} --map #{file_base}.map\n"

  # preprocess
  rep_file_name = file_base + ".rep"
  script << "/tools/java/jdk/bin/java -Xmx512M -jar /net/arrays/bin/preprocess.jar -q #{file_path} -m #{file_base}.map -o #{rep_file_name} -i -n median\n"

  # ft
  ft = File.open("#{condition}.ft", "w")
  ft << "#{rep_file_name} f 1\n"
  ft.close

  # mergeReps
  script << "/net/arrays/bin/mergeReps -opt 3 -exclude /net/arrays/Slide_Templates/exiqon_208202-A_lot31021_hsa,mmu,rno-and-related-vira_from_mb120,miRPlus.exclude #{condition}.ft #{condition}.opt.merge\n"
  script << "/net/arrays/bin/mergeReps -exclude /net/arrays/Slide_Templates/exiqon_208202-A_lot31021_hsa,mmu,rno-and-related-vira_from_mb120,miRPlus.exclude #{condition}.ft #{condition}.all.merge\n"

  # VERA
  script << "/net/arrays/bin/VERA #{condition}.opt.merge #{condition}.model\n"

  # SAM
  script << "/net/arrays/bin/SAM #{condition}.all.merge #{condition}.model #{condition}.sig\n"

  # postSAM.pl
  script << "/net/arrays/bin/postSAM.pl #{condition}.sig /net/arrays/Slide_Templates/exiqon_208202-A_lot31021_hsa,mmu,rno-and-related-vira_from_mb120,miRPlus.map #{condition}.clone\n\n"
end

script.close
system("sh run.sh")

zip_file = "VERA-SAM_#{Time.now.strftime("%Y-%m-%d")}"

`zip #{zip_file} *rep *ft *merge *model *sig *clone`
