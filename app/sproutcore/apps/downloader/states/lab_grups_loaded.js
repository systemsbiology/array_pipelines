// ==========================================================================
// Project:   Downloader.LAB_GROUPSLOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.LAB_GROUPS_LOADED = SC.Responder.create(
/** @scope Downloader.LAB_GROUPSLOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    Downloader.set('currentScene', 'labGroupsLoaded');
    Downloader.sourceController.populateContent();
  },
  
  willLoseFirstResponder: function() {
  }
  
  // ..........................................................
  // EVENTS
  //
  
}) ;
