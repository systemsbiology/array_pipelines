// ==========================================================================
// Project:   AgilentOne.ANALYSIS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
AgilentOne.ANALYSIS_FAILED = SC.Responder.create(
/** @scope AgilentOne.ANALYSIS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    AgilentOne.getPath('mainPage.analysisFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    AgilentOne.getPath('mainPage.analysisFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retry: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.ANALYSIS_RUNNING);
  },
  
  cancel: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_LOADED);
  }
}) ;
