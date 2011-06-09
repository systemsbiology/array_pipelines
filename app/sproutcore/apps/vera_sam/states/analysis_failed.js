// ==========================================================================
// Project:   VeraSam.ANALYSIS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
VeraSam.ANALYSIS_FAILED = SC.Responder.create(
/** @scope VeraSam.ANALYSIS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    VeraSam.getPath('mainPage.analysisFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    VeraSam.getPath('mainPage.analysisFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retry: function() {
  	VeraSam.makeFirstResponder(VeraSam.ANALYSIS_RUNNING);
  },
  
  cancel: function() {
  	VeraSam.makeFirstResponder(VeraSam.ARRAYS_LOADED);
  }
}) ;
