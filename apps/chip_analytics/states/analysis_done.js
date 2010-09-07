// ==========================================================================
// Project:   ChipAnalytics.ANALYSISDONE
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
ChipAnalytics.ANALYSIS_DONE = SC.Responder.create(
/** @scope ChipAnalytics.ANALYSIS_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    ChipAnalytics.getPath('mainPage.analysisDone').append() ;
  },
  
  willLoseFirstResponder: function() {
    ChipAnalytics.getPath('mainPage.analysisDone').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  close: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_LOADED);
  }
  
}) ;
