// ==========================================================================
// Project:   GeneData.ANALYSIS_FAILED
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ANALYSIS_FAILED = SC.Responder.create(
/** @scope GeneData.ANALYSIS_FAILED.prototype */ {

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
  
  // add event handlers here
  someAction: function() {
    
  }
  
}) ;
