// ==========================================================================
// Project:   ChipAnalytics.labGroupsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  The naming labGroups available to the user. This is populated during the
  labGroups loading state.

  @extends SC.ArrayController
*/
ChipAnalytics.labGroupsController = SC.ArrayController.create(
/** @scope ChipAnalytics.labGroupsController.prototype */ {
  
  load: function(){
    var labGroups = ChipAnalytics.store.find(Slimarray.LAB_GROUPS_QUERY);
  
    this.set('content', labGroups);
  },

  statusDidChange: function() {
  	ChipAnalytics.sendAction('loadingComplete');
  }.observes('status'),
}) ;
