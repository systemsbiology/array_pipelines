// ==========================================================================
// Project:   VeraSam.availableMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
VeraSam.availableMicroarraysController = SC.ArrayController.create(
/** @scope VeraSam.availableMicroarraysController.prototype */ {

  contentBinding: 'VeraSam.nestedProjectController.microarrays',
  orderBy: 'displayName',

  load: function(){
    var nestedProject = VeraSam.nestedProjectController.get('content').firstObject()
    if(!nestedProject) return NO

    var query = SC.Query.create({
	  recordType: Slimarray.Microarray,
	  conditions: "project = {project} AND labGroup = {labGroup} AND platform = {platform} AND rawDataPath != null",
	  parameters: {project: nestedProject.get('project'),
	  			   labGroup: nestedProject.get('labGroup'),
				   sampleNumber: 2, // VERA/SAM is a 2-color pipeline
				   platform: 'Exiqon'},
	  extraFields: 'lab_group,project,raw_data_path,platform_name,hybridization_date'
	 });
    nestedProject.set( 'microarrays', VeraSam.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      VeraSam.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      VeraSam.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
