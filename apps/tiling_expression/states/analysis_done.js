// ==========================================================================
// Project:   TilingExpression.ANALYSISDONE
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
TilingExpression.ANALYSIS_DONE = SC.Responder.create(
/** @scope TilingExpression.ANALYSIS_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    TilingExpression.getPath('mainPage.analysisDone').append() ;
  },
  
  willLoseFirstResponder: function() {
    TilingExpression.getPath('mainPage.analysisDone').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  close: function() {
  	TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_LOADED);
  }
  
}) ;
