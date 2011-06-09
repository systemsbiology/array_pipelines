// ==========================================================================
// Project:   GeneData.SCHEMESLOADED
// Copyright: ©2010 Institute for Systems Biology
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
	GeneData.sourceController.populateContent();
  },
  
  willLoseFirstResponder: function() {
  },
  
  // ..........................................................
  // EVENTS
  //
  
}) ;
