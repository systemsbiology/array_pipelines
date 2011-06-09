// ==========================================================================
// Project:   Downloader
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @namespace

  The initial state. Tries to load the available lab groups, and moves 
  on to the lab groups loaded or failed states depending upon whether loading
  is successful.
  
  @extends SC.Responder
*/
Downloader.LAB_GROUPS_LOADING = SC.Responder.create({

  didBecomeFirstResponder: function() {
    Downloader.set('currentScene', 'labGroupsLoading');
    Downloader.labGroupsController.load();
	Downloader.projectsController.load();
  },

  loadingComplete: function() {
  	labGroupStatus = Downloader.labGroupsController.get('status');
	projectStatus = Downloader.projectsController.get('status');
	
  	if (labGroupStatus & SC.Record.READY && projectStatus & SC.Record.READY) {
      Downloader.makeFirstResponder(Downloader.LAB_GROUPS_LOADED);
    } else if (labGroupStatus & SC.Record.ERROR || projectStatus & SC.Record.ERROR) {
      Downloader.makeFirstResponder(Downloader.LAB_GROUPS_FAILED);
    }
  },

});
