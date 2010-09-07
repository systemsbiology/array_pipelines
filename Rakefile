require 'fileutils'

namespace :build do
  desc "Build the UI and put under the server's public folder"
  task :ui do
    puts "== Building the SproutCore application(s)"
    system("sc-build")

    puts "== Placing the built application(s) under the server's public folder"
    FileUtils.rm_rf Dir.glob("server/public/static/*")
    FileUtils.rm_rf Dir.glob("server/public/ui/*")
    FileUtils.mv Dir.glob("tmp/build/pipelines/static/*"), "server/public/static/"

    FileUtils.cp Dir.glob("server/public/static/gene_data/en/*/index.html").first, "server/public/ui/gene_data.html"
    FileUtils.cp Dir.glob("server/public/static/downloader/en/*/index.html").first, "server/public/ui/downloader.html"
    FileUtils.cp Dir.glob("server/public/static/vera_sam/en/*/index.html").first, "server/public/ui/vera_sam.html"
    FileUtils.cp Dir.glob("server/public/static/agilent_one/en/*/index.html").first, "server/public/ui/agilent_one.html"
    FileUtils.cp Dir.glob("server/public/static/chip_analytics/en/*/index.html").first, "server/public/ui/chip_analytics.html"

    puts "== UI building complete"
  end
end
