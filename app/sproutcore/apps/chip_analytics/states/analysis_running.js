// ==========================================================================
// Project:   ChipAnalytics.ANALYSIS_RUNNING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
ChipAnalytics.ANALYSIS_RUNNING = SC.Responder.create(
/** @scope ChipAnalytics.ANALYSIS_RUNNING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    ChipAnalytics.getPath('mainPage.analysisRunning').append() ;
	ChipAnalytics.analysisController.submitJob();
  },
  
  willLoseFirstResponder: function() {
  	var timer = ChipAnalytics.analysisController.get('timer');
  	if(timer) timer.invalidate();
	
    ChipAnalytics.getPath('mainPage.analysisRunning').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  cancel: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_LOADED);
  },
  
  failed: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.ANALYSIS_FAILED);
  },
  
  complete: function() {
  	ChipAnalytics.makeFirstResponder(ChipAnalytics.ANALYSIS_DONE);
  }
  
}) ;
