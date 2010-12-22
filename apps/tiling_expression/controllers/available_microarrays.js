// ==========================================================================
// Project:   TilingExpression.availableMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TilingExpression.availableMicroarraysController = SC.ArrayController.create(
/** @scope TilingExpression.availableMicroarraysController.prototype */ {

  contentBinding: 'TilingExpression.nestedProjectController.microarrays',
  orderBy: 'displayName',

  load: function(){
    var nestedProject = TilingExpression.nestedProjectController.get('content').firstObject()
    if(!nestedProject) return NO

    var query = SC.Query.create({
	  recordType: Slimarray.Microarray,
	  conditions: "project = {project} AND labGroup = {labGroup} AND platform = {platform} AND rawDataPath != null",
	  parameters: {project: nestedProject.get('project'),
	  			   labGroup: nestedProject.get('labGroup'),
				   sampleNumber: 2, // this pipeline is for 2-color Agilent only
				   platform: 'Agilent'},
	  extraFields: 'lab_group,project,raw_data_path,platform_name,hybridization_date'
	 });
    nestedProject.set( 'microarrays', TilingExpression.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      TilingExpression.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      TilingExpression.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
