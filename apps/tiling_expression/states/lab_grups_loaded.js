// ==========================================================================
// Project:   TilingExpression.LAB_GROUPSLOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
TilingExpression.LAB_GROUPS_LOADED = SC.Responder.create(
/** @scope TilingExpression.LAB_GROUPSLOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    TilingExpression.set('currentScene', 'labGroupsLoaded');
	TilingExpression.sourceController.populateContent();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
}) ;
