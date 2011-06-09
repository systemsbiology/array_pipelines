// ==========================================================================
// Project:   GeneData.ANALYSIS_RUNNING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ANALYSIS_RUNNING = SC.Responder.create(
/** @scope GeneData.ANALYSIS_RUNNING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    GeneData.getPath('mainPage.analysisRunning').append() ;
	GeneData.analysisController.submitJob();
  },
  
  willLoseFirstResponder: function() {
  	var timer = GeneData.analysisController.get('timer');
  	if(timer) timer.invalidate();
	
    GeneData.getPath('mainPage.analysisRunning').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  cancel: function() {
  	GeneData.makeFirstResponder(GeneData.ARRAYS_LOADED);
  },
  
  failed: function() {
  	GeneData.makeFirstResponder(GeneData.ANALYSIS_FAILED);
  },
  
  complete: function() {
  	GeneData.makeFirstResponder(GeneData.ANALYSIS_DONE);
  }
  
}) ;
