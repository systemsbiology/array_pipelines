// ==========================================================================
// Project:   TilingExpression.labGroupController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
TilingExpression.nestedProjectController = SC.ObjectController.create(
/** @scope TilingExpression.labGroupController.prototype */ {

  contentBinding: 'TilingExpression.sourceController.selection',

  _contentDidChange: function() {
    TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_LOADING);
  }.observes('content')
}) ;
