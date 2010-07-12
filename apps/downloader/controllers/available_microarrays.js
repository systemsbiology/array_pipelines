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
  orderBy: 'name',

  load: function(){
    var nestedProject = Downloader.nestedProjectController.get('content').firstObject()
    if(!nestedProject) return NO

    var query = SC.Query.local(Slimarray.Microarray, "project = {project} AND labGroup = {labGroup}",
      {project: nestedProject.get('project'), labGroup: nestedProject.get('labGroup')});
    nestedProject.set( 'microarrays', Downloader.store.find(query) );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      Downloader.sendAction('loadingComplete');
    } else if (this.get('status') & SC.Record.ERROR) {
      Downloader.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
