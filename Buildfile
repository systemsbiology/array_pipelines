# ===========================================================================
# Project:   Pipelines
# Copyright: ©2010 Institute for Systems Biology
# ===========================================================================

# Add initial buildfile information here
config :all, :required => :sproutcore

proxy '/slimarray', :to => 'frog'