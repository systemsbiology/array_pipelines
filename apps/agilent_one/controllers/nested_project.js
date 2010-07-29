// ==========================================================================
// Project:   AgilentOne.labGroupController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
AgilentOne.nestedProjectController = SC.ObjectController.create(
/** @scope AgilentOne.labGroupController.prototype */ {

  contentBinding: 'AgilentOne.sourceController.selection',

  _contentDidChange: function() {
    AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_LOADING);
  }.observes('content'),
}) ;
