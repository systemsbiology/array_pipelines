// ==========================================================================
// Project:   Downloader.ANALYSISDONE
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.ANALYSIS_DONE = SC.Responder.create(
/** @scope Downloader.ANALYSIS_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    Downloader.getPath('mainPage.analysisDone').append() ;
  },
  
  willLoseFirstResponder: function() {
    Downloader.getPath('mainPage.analysisDone').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  close: function() {
  	Downloader.makeFirstResponder(Downloader.ARRAYS_LOADED);
  }
  
}) ;
