// ==========================================================================
// Project:   Downloader.ANALYSIS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.ANALYSIS_FAILED = SC.Responder.create(
/** @scope Downloader.ANALYSIS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    Downloader.getPath('mainPage.analysisFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    Downloader.getPath('mainPage.analysisFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retry: function() {
  	Downloader.makeFirstResponder(Downloader.ANALYSIS_RUNNING);
  },
  
  cancel: function() {
  	Downloader.makeFirstResponder(Downloader.ARRAYS_LOADED);
  }
}) ;
