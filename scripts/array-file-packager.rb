require 'rubygems'
require 'json'
require 'fileutils'

ARRAY_SHARE = "/net/arrays"

raise "file_rename_and_zip.rb expects a single JSON string argument" unless ARGV.size == 1

json_string = ARGV.first

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
  FileUtils.cp original_name, new_name
end

zip_file = "ArrayFiles_#{Time.now.strftime("%Y-%m-%d")}"

`zip #{zip_file} #{new_names.join(" ")}`
