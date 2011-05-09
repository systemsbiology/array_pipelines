class AddZipUriToJobs < ActiveRecord::Migration
  def self.up
    add_column :jobs, :zip_uri, :string
  end

  def self.down
    remove_column :jobs, :zip_uri
  end
end
