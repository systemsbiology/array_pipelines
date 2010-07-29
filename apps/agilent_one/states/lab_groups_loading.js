// ==========================================================================
// Project:   AgilentOne
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @namespace

  The initial state. Tries to load the available lab groups, and moves 
  on to the lab groups loaded or failed states depending upon whether loading
  is successful.
  
  @extends SC.Responder
*/
AgilentOne.LAB_GROUPS_LOADING = SC.Responder.create({

  didBecomeFirstResponder: function() {
    AgilentOne.set('currentScene', 'labGroupsLoading');
    AgilentOne.labGroupsController.load();
	AgilentOne.projectsController.load();
  },

  loadingComplete: function() {
  	labGroupStatus = AgilentOne.labGroupsController.get('status');
	projectStatus = AgilentOne.projectsController.get('status');
	
  	if (labGroupStatus & SC.Record.READY && projectStatus & SC.Record.READY) {
      AgilentOne.makeFirstResponder(AgilentOne.LAB_GROUPS_LOADED);
    } else if (labGroupStatus & SC.Record.ERROR || projectStatus & SC.Record.ERROR) {
      AgilentOne.makeFirstResponder(AgilentOne.LAB_GROUPS_FAILED);
    }
  },

});
