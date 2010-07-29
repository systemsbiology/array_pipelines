// ==========================================================================
// Project:   AgilentOne
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @namespace

  This state indicates that the loading the naming labGroups failed. The only
  way to exit from this state is to retry loading the naming labGroups.
  
  @extends SC.Responder
*/
AgilentOne.LAB_GROUPS_FAILED = SC.Responder.create({

  didBecomeFirstResponder: function() {
    AgilentOne.set('currentScene', 'labGroupsFailed');
  },

  retryLoading: function() {
    AgilentOne.makeFirstResponder(AgilentOne.LAB_GROUPS_LOADING);
  },

});
