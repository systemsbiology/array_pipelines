// ==========================================================================
// Project:   Downloader.ANALYSIS_RUNNING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.ANALYSIS_RUNNING = SC.Responder.create(
/** @scope Downloader.ANALYSIS_RUNNING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    Downloader.getPath('mainPage.analysisRunning').append() ;
	Downloader.analysisController.submitJob();
  },
  
  willLoseFirstResponder: function() {
    var timer = Downloader.analysisController.get('timer');
    if(timer) timer.invalidate();
	
    Downloader.getPath('mainPage.analysisRunning').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  cancel: function() {
    Downloader.makeFirstResponder(Downloader.ARRAYS_LOADED);
  },
  
  failed: function() {
    Downloader.makeFirstResponder(Downloader.ANALYSIS_FAILED);
  },
  
  complete: function() {
    Downloader.makeFirstResponder(Downloader.ANALYSIS_DONE);
  }
  
}) ;
