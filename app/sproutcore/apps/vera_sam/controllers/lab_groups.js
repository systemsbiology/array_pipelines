// ==========================================================================
// Project:   VeraSam.labGroupsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  The naming labGroups available to the user. This is populated during the
  labGroups loading state.

  @extends SC.ArrayController
*/
VeraSam.labGroupsController = SC.ArrayController.create(
/** @scope VeraSam.labGroupsController.prototype */ {
  
  load: function(){
    var labGroups = VeraSam.store.find(Slimarray.LAB_GROUPS_QUERY);
  
    this.set('content', labGroups);
  },

  statusDidChange: function() {
  	VeraSam.sendAction('loadingComplete');
  }.observes('status'),
}) ;
