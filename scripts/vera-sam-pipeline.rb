require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"

#raise "vera-sam-pipeline.rb expects a single JSON string argument" unless ARGV.size == 1

# hackish way of dealing with JSON gunk
json_string = ARGV.join(" ")[1..-3]

begin
  microarrays = JSON.parse(json_string)
rescue Exception => e
  raise "Unable to parse JSON: #{e}"
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

  rep_file_name = File.basename(file_path) + ".rep"

  # preprocess
  script << "/tools/java/jdk/bin/java -Xmx512M -jar /net/arrays/bin/preprocess.jar -q #{file_path} -m /net/arrays/Slide_Templates/exiqon_208202-A_lot31021_hsa,mmu,rno-and-related-vira_from_mb120,miRPlus.map -o #{rep_file_name} -i -n median\n"

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
