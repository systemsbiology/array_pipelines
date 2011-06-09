// ==========================================================================
// Project:   GeneData.ARRAYS_LOADED
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ARRAYS_LOADED = SC.Responder.create(
/** @scope GeneData.ARRAYS_LOADED.prototype */ {

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
  	GeneData.makeFirstResponder(GeneData.ANALYSIS_RUNNING);
  }
}) ;
