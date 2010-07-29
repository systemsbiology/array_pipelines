require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"
R_BIN = "/net/arrays/Affymetrix/R/R-2.9.1_x64/bin/R"

# hackish way of dealing with JSON gunk
json_string = ARGV.join(" ")[1..-3]

begin
  microarrays = JSON.parse(json_string)
rescue Exception => e
  raise "Unable to parse JSON: #{e}"
end

# check paths to see if they're okay
microarrays.each do |microarray|
  file_path = microarray["raw_data_path"]

  #complain if the path isn't under the ARRAY_SHARE
  if !file_path.include?(ARRAY_SHARE) || file_path.include?("..")
    raise "Path #{file_path} must lie under #{ARRAY_SHARE}"
  end
end

run_name = "Agilent_#{Time.now.strftime("%Y-%m-%d")}"

# generate a script and then run the whole job as one command
script = File.open("run.R", "w")

script << "library(marray)\n"
script << "library(preprocessCore)\n"

filelist = microarrays.collect{|m| "\"#{m["raw_data_path"]}\""}
script << "filelist <- c(#{filelist.join(",")})\n"

script << "raw <- read.maimages(files=filelist, channels=1, source=\"agilent\")\n"
script << "norm <- normalize.quantiles(raw$E)\n"

array_names = microarrays.collect{|m| "\"#{m["name"]}\""}
script << "colnames(norm) <- c(#{array_names.join(",")})\n"

script << "norm.annot <- cbind(raw$genes, norm)\n"
script << "write.table(norm.annot, file=\"#{run_name}.txt\", sep=\"\t\", row.names=FALSE)\n"

script.close

`#{R_BIN} CMD BATCH run.R`
`zip #{run_name} run.R run.Rout #{run_name}.txt`
