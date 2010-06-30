// ==========================================================================
// Project:   GeneData.availableMicroarraysController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
GeneData.availableMicroarraysController = SC.ArrayController.create(
/** @scope GeneData.availableMicroarraysController.prototype */ {

  orderBy: 'name',

  contentBinding: 'GeneData.schemeController.microarrays',

}) ;
