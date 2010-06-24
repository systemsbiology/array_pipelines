// ==========================================================================
// Project:   GeneData.sourceController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.TreeController
*/
GeneData.sourceController = SC.TreeController.create(
/** @scope GeneData.sourceController.prototype */ {

  treeItemIsGrouped: YES,
  treeItemChildrenKey: 'schemes',
  allowsMultipleSelection: NO,
  
}) ;
