# ===========================================================================
# Project:   Pipelines
# Copyright: ©2010 Institute for Systems Biology
# ===========================================================================

# Add initial buildfile information here
config :all, :required => [:sproutcore, :slimarray],
  :url_prefix => '/pipelines/static'
config :gene_data, :title => "GeneData Import File Generator"
