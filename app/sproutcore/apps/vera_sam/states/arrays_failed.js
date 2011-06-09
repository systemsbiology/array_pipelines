// ==========================================================================
// Project:   VeraSam.ARRAYS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
VeraSam.ARRAYS_FAILED = SC.Responder.create(
/** @scope VeraSam.ARRAYS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // show the error pane
    VeraSam.getPath('mainPage.samplesFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    VeraSam.getPath('mainPage.samplesFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retryLoading: function() {
    VeraSam.makeFirstResponder(VeraSam.ARRAYS_LOADING);
  },
  
  cancelLoading: function() {
  	VeraSam.makeFirstResponder(VeraSam.LAB_GROUPS_LOADED);
  }
}) ;
