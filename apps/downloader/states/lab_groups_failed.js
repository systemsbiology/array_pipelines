// ==========================================================================
// Project:   Downloader
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @namespace

  This state indicates that the loading the naming labGroups failed. The only
  way to exit from this state is to retry loading the naming labGroups.
  
  @extends SC.Responder
*/
Downloader.LAB_GROUPS_FAILED = SC.Responder.create({

  didBecomeFirstResponder: function() {
    Downloader.set('currentScene', 'labGroupsFailed');
  },

  retryLoading: function() {
    Downloader.makeFirstResponder(Downloader.LAB_GROUPS_LOADING);
  },

});
