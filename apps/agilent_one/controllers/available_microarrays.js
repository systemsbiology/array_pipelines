// ==========================================================================
// Project:   AgilentOne.availableMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
AgilentOne.availableMicroarraysController = SC.ArrayController.create(
/** @scope AgilentOne.availableMicroarraysController.prototype */ {

  contentBinding: 'AgilentOne.nestedProjectController.microarrays',
  orderBy: 'displayName',

  load: function(){
    var nestedProject = AgilentOne.nestedProjectController.get('content').firstObject()
    if(!nestedProject) return NO

    var query = SC.Query.create({
	  recordType: Slimarray.Microarray,
	  conditions: "project = {project} AND labGroup = {labGroup} AND platform = {platform} AND rawDataPath != null",
	  parameters: {project: nestedProject.get('project'),
	  			   labGroup: nestedProject.get('labGroup'),
				   sampleNumber: 1, // this pipeline is for 1-color Agilent only
				   platform: 'Agilent'},
	  extraFields: 'lab_group,project,raw_data_path,platform_name,hybridization_date'
	 });
    nestedProject.set( 'microarrays', AgilentOne.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      AgilentOne.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      AgilentOne.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
