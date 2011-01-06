require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"

# message that gets passed back to UI
message_file = File.open("message.log", "w")

begin
  raise "file_rename_and_zip.rb expects a single JSON string argument" unless ARGV.size == 1

  # hackish way of dealing with JSON gunk
  json_string = ARGV.join(" ")
  json_string = /\"(.*?)=?\"$/.match(json_string)[1]

  begin
    file_sets = JSON.parse(json_string)
  rescue Exception => e
    raise "Unable to parse JSON: #{e}"
  end

  new_names = Array.new
  file_sets.each do |file_set|
    original_name = file_set["original_name"]

    #complain if the path isn't under the ARRAY_SHARE
    if !original_name.include?(ARRAY_SHARE) || original_name.include?("..")
      raise "Path #{original_name} must lie under #{ARRAY_SHARE}"
    end

    # just use the basename here so we don't have to worry about sanitizing the path
    new_name = File.basename(file_set["new_name"])

    new_names << new_name
    system("ln -s #{original_name} #{new_name}")
  end

  zip_file = "ArrayFiles_#{Time.now.strftime("%Y-%m-%d")}"

  `zip #{zip_file} #{new_names.join(" ")}`

  # remove symlinks to files that were zipped
  new_names.each{|name| FileUtils.rm(name)}
rescue Exception => e
  message_file << e.to_s
end
