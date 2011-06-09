// ==========================================================================
// Project:   ChipAnalytics
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @namespace

  The initial state. Tries to load the available lab groups, and moves 
  on to the lab groups loaded or failed states depending upon whether loading
  is successful.
  
  @extends SC.Responder
*/
ChipAnalytics.LAB_GROUPS_LOADING = SC.Responder.create({

  didBecomeFirstResponder: function() {
    ChipAnalytics.set('currentScene', 'labGroupsLoading');
    ChipAnalytics.labGroupsController.load();
	ChipAnalytics.projectsController.load();
  },

  loadingComplete: function() {
  	labGroupStatus = ChipAnalytics.labGroupsController.get('status');
	projectStatus = ChipAnalytics.projectsController.get('status');
	
  	if (labGroupStatus & SC.Record.READY && projectStatus & SC.Record.READY) {
      ChipAnalytics.makeFirstResponder(ChipAnalytics.LAB_GROUPS_LOADED);
    } else if (labGroupStatus & SC.Record.ERROR || projectStatus & SC.Record.ERROR) {
      ChipAnalytics.makeFirstResponder(ChipAnalytics.LAB_GROUPS_FAILED);
    }
  },

});
