// ==========================================================================
// Project:   Downloader.ARRAYS_LOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.ARRAYS_LOADED = SC.Responder.create(
/** @scope Downloader.ARRAYS_LOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // Called when this state becomes first responder
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  },
  
  // ..........................................................
  // EVENTS
  //
  
  runAnalysis: function() {
  	Downloader.makeFirstResponder(Downloader.ANALYSIS_RUNNING);
  }
}) ;
