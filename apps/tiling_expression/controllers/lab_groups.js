// ==========================================================================
// Project:   TilingExpression.labGroupsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  The naming labGroups available to the user. This is populated during the
  labGroups loading state.

  @extends SC.ArrayController
*/
TilingExpression.labGroupsController = SC.ArrayController.create(
/** @scope TilingExpression.labGroupsController.prototype */ {
  
  load: function(){
    var labGroups = TilingExpression.store.find(Slimarray.LAB_GROUPS_QUERY);
  
    this.set('content', labGroups);
  },

  statusDidChange: function() {
    TilingExpression.sendAction('loadingComplete');
  }.observes('status')
}) ;
