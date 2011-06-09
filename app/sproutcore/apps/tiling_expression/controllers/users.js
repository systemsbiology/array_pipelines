// ==========================================================================
// Project:   TilingExpression.userController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your Controller Here)

  @extends SC.ObjectController
*/
TilingExpression.usersController = SC.ArrayController.create(
/** @scope TilingExpression.userController.prototype */ {

  load: function(){
    var users = TilingExpression.store.find(Slimarray.USER_QUERY);
  
    this.set('content', users);
  },

  statusDidChange: function() {
    TilingExpression.sendAction('loadingComplete');
  }.observes('status')

}) ;
