// ==========================================================================
// Project:   GeneData.availableMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
GeneData.availableMicroarraysController = SC.ArrayController.create(
/** @scope GeneData.availableMicroarraysController.prototype */ {

  contentBinding: 'GeneData.schemeController.microarrays',
  orderBy: 'displayName',

  load: function(){
    var schemeProject = GeneData.schemeController.get('content').firstObject()
    if(!schemeProject) return NO

	var query = SC.Query.create({
	  recordType: Slimarray.Microarray,
	  conditions: "project = {project} AND scheme = {scheme} AND rawDataPath != null",
	  parameters: {project: schemeProject.get('project'),
				scheme: schemeProject.get('scheme')},
	  extraFields: 'scheme,lab_group,project,chip_name,schemed_descriptors,raw_data_path,array_number,hybridization_date,platform_name'
	 });
    schemeProject.set( 'microarrays', GeneData.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      GeneData.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      GeneData.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
