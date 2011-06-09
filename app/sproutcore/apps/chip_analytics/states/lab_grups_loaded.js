// ==========================================================================
// Project:   ChipAnalytics.LAB_GROUPSLOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
ChipAnalytics.LAB_GROUPS_LOADED = SC.Responder.create(
/** @scope ChipAnalytics.LAB_GROUPSLOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    ChipAnalytics.set('currentScene', 'labGroupsLoaded');
	ChipAnalytics.sourceController.populateContent();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
}) ;
