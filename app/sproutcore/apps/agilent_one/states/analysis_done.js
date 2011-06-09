// ==========================================================================
// Project:   AgilentOne.ANALYSISDONE
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
AgilentOne.ANALYSIS_DONE = SC.Responder.create(
/** @scope AgilentOne.ANALYSIS_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    AgilentOne.getPath('mainPage.analysisDone').append() ;
  },
  
  willLoseFirstResponder: function() {
    AgilentOne.getPath('mainPage.analysisDone').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  close: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_LOADED);
  }
  
}) ;
