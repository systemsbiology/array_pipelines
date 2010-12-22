// ==========================================================================
// Project:   TilingExpression.ANALYSIS_RUNNING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
TilingExpression.ANALYSIS_RUNNING = SC.Responder.create(
/** @scope TilingExpression.ANALYSIS_RUNNING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    TilingExpression.getPath('mainPage.analysisRunning').append() ;
	TilingExpression.analysisController.submitJob();
  },
  
  willLoseFirstResponder: function() {
  	var timer = TilingExpression.analysisController.get('timer');
  	if(timer) timer.invalidate();
	
    TilingExpression.getPath('mainPage.analysisRunning').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  cancel: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_LOADED);
  },
  
  failed: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.ANALYSIS_FAILED);
  },
  
  complete: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.ANALYSIS_DONE);
  }
  
}) ;
