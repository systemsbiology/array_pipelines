// ==========================================================================
// Project:   VeraSam
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @namespace

  This state indicates that the loading the naming labGroups failed. The only
  way to exit from this state is to retry loading the naming labGroups.
  
  @extends SC.Responder
*/
VeraSam.LAB_GROUPS_FAILED = SC.Responder.create({

  didBecomeFirstResponder: function() {
    VeraSam.set('currentScene', 'labGroupsFailed');
  },

  retryLoading: function() {
    VeraSam.makeFirstResponder(VeraSam.LAB_GROUPS_LOADING);
  },

});
