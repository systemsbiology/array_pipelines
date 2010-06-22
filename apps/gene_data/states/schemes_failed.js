// ==========================================================================
// Project:   GeneData
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @namespace

  This state indicates that the loading the naming schemes failed. The only
  way to exit from this state is to retry loading the naming schemes.
  
  @extends SC.Responder
*/
GeneData.SCHEMES_FAILED = SC.Responder.create({

  didBecomeFirstResponder: function() {
    GeneData.set('currentScene', 'schemesFailed');
  },

  retryLoading: function() {
    GeneData.makeFirstResponder(GeneData.SCHEMES_LOADING);
  },

});
