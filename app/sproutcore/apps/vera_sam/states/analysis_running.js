// ==========================================================================
// Project:   VeraSam.ANALYSIS_RUNNING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
VeraSam.ANALYSIS_RUNNING = SC.Responder.create(
/** @scope VeraSam.ANALYSIS_RUNNING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    VeraSam.getPath('mainPage.analysisRunning').append() ;
	VeraSam.analysisController.submitJob();
  },
  
  willLoseFirstResponder: function() {
  	var timer = VeraSam.analysisController.get('timer');
  	if(timer) timer.invalidate();
	
    VeraSam.getPath('mainPage.analysisRunning').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  cancel: function() {
  	VeraSam.makeFirstResponder(VeraSam.ARRAYS_LOADED);
  },
  
  failed: function() {
  	VeraSam.makeFirstResponder(VeraSam.ANALYSIS_FAILED);
  },
  
  complete: function() {
  	VeraSam.makeFirstResponder(VeraSam.ANALYSIS_DONE);
  }
  
}) ;
