// ==========================================================================
// Project:   VeraSam.labGroupController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
VeraSam.nestedProjectController = SC.ObjectController.create(
/** @scope VeraSam.labGroupController.prototype */ {

  contentBinding: 'VeraSam.sourceController.selection',

  _contentDidChange: function() {
    VeraSam.makeFirstResponder(VeraSam.ARRAYS_LOADING);
  }.observes('content'),
}) ;
