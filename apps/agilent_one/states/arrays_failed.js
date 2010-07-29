// ==========================================================================
// Project:   AgilentOne.ARRAYS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
AgilentOne.ARRAYS_FAILED = SC.Responder.create(
/** @scope AgilentOne.ARRAYS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // show the error pane
    AgilentOne.getPath('mainPage.samplesFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    AgilentOne.getPath('mainPage.samplesFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retryLoading: function() {
    AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_LOADING);
  },
  
  cancelLoading: function() {
  	AgilentOne.makeFirstResponder(AgilentOne.LAB_GROUPS_LOADED);
  }
}) ;
