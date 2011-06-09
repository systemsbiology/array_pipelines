// ==========================================================================
// Project:   AgilentOne.LAB_GROUPSLOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
AgilentOne.LAB_GROUPS_LOADED = SC.Responder.create(
/** @scope AgilentOne.LAB_GROUPSLOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    AgilentOne.set('currentScene', 'labGroupsLoaded');
	AgilentOne.sourceController.populateContent();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
}) ;
