// ==========================================================================
// Project:   Downloader.ARRAYS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.ARRAYS_FAILED = SC.Responder.create(
/** @scope Downloader.ARRAYS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // show the error pane
    Downloader.getPath('mainPage.samplesFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    Downloader.getPath('mainPage.samplesFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retryLoading: function() {
    Downloader.makeFirstResponder(Downloader.ARRAYS_LOADING);
  },
  
  cancelLoading: function() {
  	Downloader.makeFirstResponder(Downloader.LAB_GROUPS_LOADED);
  }
}) ;
