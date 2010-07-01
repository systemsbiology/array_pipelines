// ==========================================================================
// Project:   GeneData.schemeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
GeneData.schemeController = SC.ObjectController.create(
/** @scope GeneData.schemeController.prototype */ {

  contentBinding: 'GeneData.sourceController.selection',

  _contentDidChange: function() {
    GeneData.makeFirstResponder(GeneData.ARRAYS_LOADING);
  }.observes('content'),
}) ;
