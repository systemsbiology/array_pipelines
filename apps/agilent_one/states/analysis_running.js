// ==========================================================================
// Project:   AgilentOne.ANALYSIS_RUNNING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
AgilentOne.ANALYSIS_RUNNING = SC.Responder.create(
/** @scope AgilentOne.ANALYSIS_RUNNING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    AgilentOne.getPath('mainPage.analysisRunning').append() ;
	AgilentOne.analysisController.submitJob();
  },
  
  willLoseFirstResponder: function() {
  	var timer = AgilentOne.analysisController.get('timer');
  	if(timer) timer.invalidate();
	
    AgilentOne.getPath('mainPage.analysisRunning').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  cancel: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_LOADED);
  },
  
  failed: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.ANALYSIS_FAILED);
  },
  
  complete: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.ANALYSIS_DONE);
  }
  
}) ;
