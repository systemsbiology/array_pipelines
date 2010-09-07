// ==========================================================================
// Project:   ChipAnalytics.ARRAYS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
ChipAnalytics.ARRAYS_FAILED = SC.Responder.create(
/** @scope ChipAnalytics.ARRAYS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // show the error pane
    ChipAnalytics.getPath('mainPage.samplesFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    ChipAnalytics.getPath('mainPage.samplesFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retryLoading: function() {
    ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_LOADING);
  },
  
  cancelLoading: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.LAB_GROUPS_LOADED);
  }
}) ;
