// ==========================================================================
// Project:   ChipAnalytics.availableMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
ChipAnalytics.availableMicroarraysController = SC.ArrayController.create(
/** @scope ChipAnalytics.availableMicroarraysController.prototype */ {

  contentBinding: 'ChipAnalytics.nestedProjectController.microarrays',
  orderBy: 'displayName',

  load: function(){
    var nestedProject = ChipAnalytics.nestedProjectController.get('content').firstObject()
    if(!nestedProject) return NO

    var query = SC.Query.create({
	  recordType: Slimarray.Microarray,
	  conditions: "project = {project} AND labGroup = {labGroup} AND platform = {platform} AND rawDataPath != null",
	  parameters: {project: nestedProject.get('project'),
	  			   labGroup: nestedProject.get('labGroup'),
				   sampleNumber: 2, // this pipeline is for 2-color Agilent only
				   platform: 'Agilent'},
	  extraFields: 'lab_group,project,raw_data_path,chip_name,platform_name,hybridization_date'
	 });
    nestedProject.set( 'microarrays', ChipAnalytics.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      ChipAnalytics.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      ChipAnalytics.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
