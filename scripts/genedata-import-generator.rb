require 'rubygems'
require 'json'
require 'fileutils'
require 'csv'

ARRAY_SHARE = "/net/arrays"

raise "genedata-import-generator.rb expects a single JSON string argument" unless ARGV.size == 1

json_string = ARGV.first

begin
  microarrays = JSON.parse(json_string)
rescue Exception => e
  raise "Unable to parse JSON: #{e}"
end

file_names = Array.new
columns = ["Column"]
data = Array.new
microarrays.each do |microarray|
  ###########################################################
  # Validate and gather paths
  ###########################################################

  path = microarray['raw_data_path']

  # complain if the path isn't under the ARRAY_SHARE
  if !path.include?(ARRAY_SHARE) || path.include?("..")
    raise "Path #{path} must lie under #{ARRAY_SHARE}"
  end

  file_names << path

  ###########################################################
  # Gather data for CSV file
  ###########################################################

  basename = File.basename(path)

  array_data = {
    "Column" => basename,
    "Multi-array [C]" => microarray['chip_name'],
    "Sub-array [C]" => microarray['array_number'],
    "Unique from Name [A]" => "#{microarray['chip_name'}_#{microarray['array_number']}"
  }

  if microarray['schemed_descriptors'].empty?
    array_data['Sample Name'] = microarray['name']
  else
    microarray['schemed_descriptors'].each do |key, value|
      columns << key unless columns.include? key
      array_data[key] = value
    end
  end

  data << array_data
end

columns.concat ["Multi-array [C]", "Sub-array [C]", "Unique from Name [A]"]

date = Time.now.strftime("%Y-%m-%d")
csv_name = "GeneData_#{date}.csv"

CSV.open(csv_name, 'w') do |writer|
  writer << ["# Namespace: Agilent"] << ["# Target: COL"] << ["# Version: 1"]
  writer << columns

  data.each do |array_data|
    ordered_data = Array.new

    columns.each do |column|
      if array_data.include? column
        ordered_data << array_data[column]
      else
        ordered_data << ""
      end
    end

    writer << ordered_data
  end
end

zip_file = "GeneData_#{date}"

`zip #{zip_file} #{csv_name} #{file_names.join(" ")}`
