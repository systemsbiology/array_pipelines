// ==========================================================================
// Project:   TilingExpression.ANALYSIS_FAILED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
TilingExpression.ANALYSIS_FAILED = SC.Responder.create(
/** @scope TilingExpression.ANALYSIS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    TilingExpression.getPath('mainPage.analysisFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    TilingExpression.getPath('mainPage.analysisFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retry: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.ANALYSIS_RUNNING);
  },
  
  cancel: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_LOADED);
  }
}) ;
