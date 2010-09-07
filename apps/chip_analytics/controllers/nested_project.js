// ==========================================================================
// Project:   ChipAnalytics.labGroupController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
ChipAnalytics.nestedProjectController = SC.ObjectController.create(
/** @scope ChipAnalytics.labGroupController.prototype */ {

  contentBinding: 'ChipAnalytics.sourceController.selection',

  _contentDidChange: function() {
    ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_LOADING);
  }.observes('content'),
}) ;
