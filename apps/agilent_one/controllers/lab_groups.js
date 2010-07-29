// ==========================================================================
// Project:   AgilentOne.labGroupsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  The naming labGroups available to the user. This is populated during the
  labGroups loading state.

  @extends SC.ArrayController
*/
AgilentOne.labGroupsController = SC.ArrayController.create(
/** @scope AgilentOne.labGroupsController.prototype */ {
  
  load: function(){
    var labGroups = AgilentOne.store.find(Slimarray.LAB_GROUPS_QUERY);
  
    this.set('content', labGroups);
  },

  statusDidChange: function() {
  	AgilentOne.sendAction('loadingComplete');
  }.observes('status'),
}) ;
