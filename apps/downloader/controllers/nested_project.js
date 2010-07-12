// ==========================================================================
// Project:   Downloader.labGroupController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Downloader.nestedProjectController = SC.ObjectController.create(
/** @scope Downloader.labGroupController.prototype */ {

  contentBinding: 'Downloader.sourceController.selection',

  _contentDidChange: function() {
    Downloader.makeFirstResponder(Downloader.ARRAYS_LOADING);
  }.observes('content'),
}) ;
