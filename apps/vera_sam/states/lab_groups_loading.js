// ==========================================================================
// Project:   VeraSam
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @namespace

  The initial state. Tries to load the available lab groups, and moves 
  on to the lab groups loaded or failed states depending upon whether loading
  is successful.
  
  @extends SC.Responder
*/
VeraSam.LAB_GROUPS_LOADING = SC.Responder.create({

  didBecomeFirstResponder: function() {
    VeraSam.set('currentScene', 'labGroupsLoading');
    VeraSam.labGroupsController.load();
	VeraSam.projectsController.load();
  },

  loadingComplete: function() {
  	labGroupStatus = VeraSam.labGroupsController.get('status');
	projectStatus = VeraSam.projectsController.get('status');
	
  	if (labGroupStatus & SC.Record.READY && projectStatus & SC.Record.READY) {
      VeraSam.makeFirstResponder(VeraSam.LAB_GROUPS_LOADED);
    } else if (labGroupStatus & SC.Record.ERROR || projectStatus & SC.Record.ERROR) {
      VeraSam.makeFirstResponder(VeraSam.LAB_GROUPS_FAILED);
    }
  },

});
