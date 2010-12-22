// ==========================================================================
// Project:   TilingExpression
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @namespace

  The initial state. Tries to load the available lab groups, and moves 
  on to the lab groups loaded or failed states depending upon whether loading
  is successful.
  
  @extends SC.Responder
*/
TilingExpression.LAB_GROUPS_LOADING = SC.Responder.create({

  didBecomeFirstResponder: function() {
    TilingExpression.set('currentScene', 'labGroupsLoading');
    TilingExpression.labGroupsController.load();
	TilingExpression.projectsController.load();
  },

  loadingComplete: function() {
  	labGroupStatus = TilingExpression.labGroupsController.get('status');
	projectStatus = TilingExpression.projectsController.get('status');
	
  	if (labGroupStatus & SC.Record.READY && projectStatus & SC.Record.READY) {
      TilingExpression.makeFirstResponder(TilingExpression.LAB_GROUPS_LOADED);
    } else if (labGroupStatus & SC.Record.ERROR || projectStatus & SC.Record.ERROR) {
      TilingExpression.makeFirstResponder(TilingExpression.LAB_GROUPS_FAILED);
    }
  },

});
