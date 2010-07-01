// ==========================================================================
// Project:   GeneData.ARRAYS_FAILED
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ARRAYS_FAILED = SC.Responder.create(
/** @scope GeneData.ARRAYS_FAILED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    // show the error pane
    GeneData.getPath('mainPage.samplesFailed').append() ;
  },
  
  willLoseFirstResponder: function() {
    GeneData.getPath('mainPage.samplesFailed').remove() ;
  },
  
  // ..........................................................
  // EVENTS
  //
  
  retryLoading: function() {
    GeneData.makeFirstResponder(GeneData.ARRAYS_LOADING);
  },
  
  cancelLoading: function() {
  	GeneData.makeFirstResponder(GeneData.SCHEMES_LOADED);
  }
}) ;
