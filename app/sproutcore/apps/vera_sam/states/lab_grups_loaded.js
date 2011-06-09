// ==========================================================================
// Project:   VeraSam.LAB_GROUPSLOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
VeraSam.LAB_GROUPS_LOADED = SC.Responder.create(
/** @scope VeraSam.LAB_GROUPSLOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    VeraSam.set('currentScene', 'labGroupsLoaded');
	VeraSam.sourceController.populateContent();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
}) ;
