// ==========================================================================
// Project:   TilingExpression
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @namespace

  This state indicates that the loading the naming labGroups failed. The only
  way to exit from this state is to retry loading the naming labGroups.
  
  @extends SC.Responder
*/
TilingExpression.LAB_GROUPS_FAILED = SC.Responder.create({

  didBecomeFirstResponder: function() {
    TilingExpression.set('currentScene', 'labGroupsFailed');
  },

  retryLoading: function() {
    TilingExpression.makeFirstResponder(TilingExpression.LAB_GROUPS_LOADING);
  },

});
