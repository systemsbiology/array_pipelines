require 'rubygems'
require 'json'
require 'fileutils'
require 'csv'

ARRAY_SHARE = "/net/arrays"

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

  file_names = Array.new
  columns = ["Column"]
  data = Array.new
  microarrays.each do |microarray|
    ###########################################################
    # Validate and gather paths
    ###########################################################

    path = microarray['raw_data_path']
    next unless path

    # complain if the path isn't under the ARRAY_SHARE
    if !path.include?(ARRAY_SHARE) || path.include?("..")
      raise "Path #{path} must lie under #{ARRAY_SHARE}"
    end

    file_names << path

    ###########################################################
    # Gather data for CSV file
    ###########################################################

    basename = File.basename(path, ".*")
    
    multiarray = microarray['chip_name']
    if basename =~ /(.*)_(\d_(\d))/
      subarray = $2
      unique = [multiarray, $3].join("_")
    else
      subarray = microarray['array_number']
      unique = [multiarray, subarray].join("_")
    end

    array_data = {
      "Column" => basename,
      "Multi-array [C]" => multiarray,
      "Sub-array [C]" => subarray,
      "Unique from Name [A]" => unique
    }

    if microarray['schemed_descriptors'].empty?
      columns << "Sample Name" unless columns.include? "Sample Name"
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

  `zip -j #{zip_file} #{csv_name} #{file_names.join(" ")}`
rescue Exception => e
  message_file << e.to_s
end
