// ==========================================================================
// Project:   Downloader.labGroupsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  The naming labGroups available to the user. This is populated during the
  labGroups loading state.

  @extends SC.ArrayController
*/
Downloader.labGroupsController = SC.ArrayController.create(
/** @scope Downloader.labGroupsController.prototype */ {
  
  load: function(){
    var labGroups = Downloader.store.find(Slimarray.LAB_GROUPS_QUERY);
  
    this.set('content', labGroups);
  },

  statusDidChange: function() {
  	Downloader.sendAction('loadingComplete');
  }.observes('status'),
}) ;
