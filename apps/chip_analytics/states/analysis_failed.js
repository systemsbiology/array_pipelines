// ==========================================================================
// Project:   ChipAnalytics.ANALYSIS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
ChipAnalytics.ANALYSIS_FAILED = SC.Responder.create(
/** @scope ChipAnalytics.ANALYSIS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    ChipAnalytics.getPath('mainPage.analysisFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    ChipAnalytics.getPath('mainPage.analysisFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retry: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.ANALYSIS_RUNNING);
  },
  
  cancel: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_LOADED);
  }
}) ;
