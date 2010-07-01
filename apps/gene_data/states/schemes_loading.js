// ==========================================================================
// Project:   GeneData
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @namespace

  The initial state. Tries to load the available naming schemes, and moves 
  on to the schemes loaded or failed states depending upon whether loading
  is successful.
  
  @extends SC.Responder
*/
GeneData.SCHEMES_LOADING = SC.Responder.create({

  didBecomeFirstResponder: function() {
    GeneData.set('currentScene', 'schemesLoading');
    GeneData.schemesController.load();
  },

  loadingComplete: function() {
    GeneData.makeFirstResponder(GeneData.SCHEMES_LOADED);
  },

  loadingFailed: function() {
    GeneData.makeFirstResponder(GeneData.SCHEMES_FAILED);
  },

});
