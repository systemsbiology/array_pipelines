// ==========================================================================
// Project:   GeneData.ANALYSIS_FAILED
// Copyright: ©2010 Institute for Systems Biology
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
    GeneData.getPath('mainPage.analysisFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    GeneData.getPath('mainPage.analysisFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retry: function() {
  	GeneData.makeFirstResponder(GeneData.ANALYSIS_RUNNING);
  },
  
  cancel: function() {
  	GeneData.makeFirstResponder(GeneData.ARRAYS_LOADED);
  }
}) ;
