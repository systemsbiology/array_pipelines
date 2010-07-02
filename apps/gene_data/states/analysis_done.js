// ==========================================================================
// Project:   GeneData.ANALYSISDONE
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ANALYSIS_DONE = SC.Responder.create(
/** @scope GeneData.ANALYSIS_DONE.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    GeneData.getPath('mainPage.analysisDone').append() ;
  },
  
  willLoseFirstResponder: function() {
    GeneData.getPath('mainPage.analysisDone').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  close: function() {
  	GeneData.makeFirstResponder(GeneData.ARRAYS_LOADED);
  }
  
}) ;
