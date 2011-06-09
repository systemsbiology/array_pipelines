// ==========================================================================
// Project:   Downloader.projectsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Downloader.projectsController = SC.ArrayController.create(
/** @scope Downloader.projectsController.prototype */ {

  load: function(){
    var projects = Downloader.store.find(Slimarray.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    Downloader.sendAction('loadingComplete');
  }.observes('status'),
}) ;
