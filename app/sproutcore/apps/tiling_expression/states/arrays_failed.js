// ==========================================================================
// Project:   TilingExpression.ARRAYS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
TilingExpression.ARRAYS_FAILED = SC.Responder.create(
/** @scope TilingExpression.ARRAYS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // show the error pane
    TilingExpression.getPath('mainPage.samplesFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    TilingExpression.getPath('mainPage.samplesFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retryLoading: function() {
    TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_LOADING);
  },
  
  cancelLoading: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.LAB_GROUPS_LOADED);
  }
}) ;
