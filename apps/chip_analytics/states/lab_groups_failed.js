// ==========================================================================
// Project:   ChipAnalytics
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @namespace

  This state indicates that the loading the naming labGroups failed. The only
  way to exit from this state is to retry loading the naming labGroups.
  
  @extends SC.Responder
*/
ChipAnalytics.LAB_GROUPS_FAILED = SC.Responder.create({

  didBecomeFirstResponder: function() {
    ChipAnalytics.set('currentScene', 'labGroupsFailed');
  },

  retryLoading: function() {
    ChipAnalytics.makeFirstResponder(ChipAnalytics.LAB_GROUPS_LOADING);
  },

});
