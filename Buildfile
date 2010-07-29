# ===========================================================================
# Project:   Pipelines
# Copyright: ©2010 Institute for Systems Biology
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :slimarray],
  :url_prefix => '/pipelines/static'
config :gene_data, :title => "GeneData Import File Generator"
config :downloader, :title => "Microarray Data Downloader"
config :vera_sam, :title => "Exiqon VERA/SAM 2-color Pipeline"
config :agilent_one, :title => "Agilent 1-color Normalizer"

proxy '/slimarray', :to => 'frog'
proxy '/pipelines', :to => 'frog'
