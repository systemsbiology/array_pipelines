// ==========================================================================
// Project:   GeneData.SCHEMESLOADED
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.SCHEMES_LOADED = SC.Responder.create(
/** @scope GeneData.SCHEMESLOADED.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  didBecomeFirstResponder: function() {
    GeneData.set('currentScene', 'schemesLoaded');
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
  // add event handlers here
  someAction: function() {
    
  }
  
}) ;
