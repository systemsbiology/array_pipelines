// ==========================================================================
// Project:   GeneData.ARRAYS_LOADING
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ARRAYS_LOADING = SC.Responder.create(
/** @scope GeneData.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    GeneData.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    // Called when this state loses first responder
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    GeneData.makeFirstResponder(GeneData.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    GeneData.makeFirstResponder(GeneData.ARRAYS_FAILED);
  },
  
}) ;
