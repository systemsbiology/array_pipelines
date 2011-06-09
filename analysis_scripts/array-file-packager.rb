#!/tools/bin/ruby

require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"

# message that gets passed back to UI
message_file = File.open("message.log", "w")

begin
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

  file_sets = job["microarrays"]

  result_files = Array.new
  file_sets.each do |file_set|
    original_name = file_set["original_name"]

    #complain if the path isn't under the ARRAY_SHARE
    if !original_name.include?(ARRAY_SHARE) || original_name.include?("..")
      raise "Path #{original_name} must lie under #{ARRAY_SHARE}"
    end

    # just use the basename here so we don't have to worry about sanitizing the path
    new_name = File.basename(file_set["new_name"])

    result_files << new_name
    system("ln -s #{original_name} #{new_name}")

    # if an accompanying PDF report exists, grab it
    original_pdf = original_name.gsub(/\.\w+$/,'.pdf')
    if File.exists? original_pdf
      new_pdf = new_name.gsub(/\.\w+$/, '.pdf')

      result_files << new_pdf
      system("ln -s #{original_pdf} #{new_pdf}")
    end
  end

  zip_file = "ArrayFiles_#{Time.now.strftime("%Y-%m-%d")}"

  `zip #{zip_file} #{result_files.join(" ")}`

  # remove symlinks to files that were zipped
  result_files.each{|name| FileUtils.rm(name)}
rescue Exception => e
  message_file << e.to_s
end
