require 'fileutils'
require 'yaml'

namespace :build do
  desc "Build the UI and put it under the public folder"
  task :ui do
    # use configuration from the rails server
    rails_env = ENV['RAILS_ENV'] || "development"
    APP_CONFIG = YAML.load_file("config/application.yml")[rails_env]

    puts "== Building the SproutCore application(s)"
    system("cd app/sproutcore; sc-build")

    puts "== Placing the built application(s) under the server's public folder"
    FileUtils.rm_rf Dir.glob("public/static/*")
    FileUtils.rm_rf Dir.glob("public/ui/*")
    FileUtils.mv Dir.glob("app/sproutcore/tmp/build/pipelines/static/*"), "public/static/"
    FileUtils.rm_rf Dir.glob("app/sproutcore/tmp")

    APP_CONFIG["pipelines"].each do |pipeline|
      FileUtils.cp Dir.glob("public/static/#{pipeline}/en/*/index.html").first, "public/ui/#{pipeline}.html"
    end

    puts "== UI building complete"
  end
end

