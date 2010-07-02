// ==========================================================================
// Project:   GeneData
// Copyright: ©2010 Institute for Systems Biology
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
	GeneData.projectsController.load();
  },

  loadingComplete: function() {
  	schemeStatus = GeneData.schemesController.get('status');
	projectStatus = GeneData.projectsController.get('status');
	
  	if (schemeStatus & SC.Record.READY && projectStatus & SC.Record.READY) {
      GeneData.makeFirstResponder(GeneData.SCHEMES_LOADED);
    } else if (schemeStatus & SC.Record.ERROR || projectStatus & SC.Record.ERROR) {
      GeneData.makeFirstResponder(GeneData.SCHEMES_FAILED);
    }
  },

});
