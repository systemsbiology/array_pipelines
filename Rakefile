require 'fileutils'
require 'yaml'

namespace :build do
  desc "Build the UI and put under the server's public folder"
  task :ui do
    # use configuration from the rails server
    rails_env = ENV['RAILS_ENV'] || "development"
    APP_CONFIG = YAML.load_file("server/config/application.yml")[rails_env]

    puts "== Building the SproutCore application(s)"
    system("sc-build")

    puts "== Placing the built application(s) under the server's public folder"
    FileUtils.rm_rf Dir.glob("server/public/static/*")
    FileUtils.rm_rf Dir.glob("server/public/ui/*")
    FileUtils.mv Dir.glob("tmp/build/pipelines/static/*"), "server/public/static/"

    APP_CONFIG["pipelines"].each do |pipeline|
      FileUtils.cp Dir.glob("server/public/static/#{pipeline}/en/*/index.html").first, "server/public/ui/#{pipeline}.html"
    end

    puts "== UI building complete"
  end
end
