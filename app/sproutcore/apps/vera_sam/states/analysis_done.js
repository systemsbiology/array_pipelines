// ==========================================================================
// Project:   VeraSam.ANALYSISDONE
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
VeraSam.ANALYSIS_DONE = SC.Responder.create(
/** @scope VeraSam.ANALYSIS_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    VeraSam.getPath('mainPage.analysisDone').append() ;
  },
  
  willLoseFirstResponder: function() {
    VeraSam.getPath('mainPage.analysisDone').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  close: function() {
  	VeraSam.makeFirstResponder(VeraSam.ARRAYS_LOADED);
  }
  
}) ;
