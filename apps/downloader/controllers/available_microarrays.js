// ==========================================================================
// Project:   Downloader.availableMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Downloader.availableMicroarraysController = SC.ArrayController.create(
/** @scope Downloader.availableMicroarraysController.prototype */ {

  contentBinding: 'Downloader.nestedProjectController.microarrays',
  orderBy: 'displayName',

  load: function(){
    var nestedProject = Downloader.nestedProjectController.get('content').firstObject();
    if(!nestedProject) return NO;

    var query = SC.Query.create({
	  recordType: Slimarray.Microarray,
	  conditions: "project = {project} AND labGroup = {labGroup} AND rawDataPath != null",
	  parameters: {project: nestedProject.get('project'),
      labGroup: nestedProject.get('labGroup')},
	  extraFields: 'lab_group,project,raw_data_path,platform_name,hybridization_date'
	 });
    nestedProject.set( 'microarrays', Downloader.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      Downloader.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      Downloader.sendAction('loadingFailed');
    }
  }.observes('status')
});
