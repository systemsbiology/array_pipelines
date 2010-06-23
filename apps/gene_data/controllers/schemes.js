// ==========================================================================
// Project:   GeneData.schemesController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  The naming schemes available to the user. This is populated during the
  schemes loading state.

  @extends SC.ArrayController
*/
GeneData.schemesController = SC.ArrayController.create(
/** @scope GeneData.schemesController.prototype */ {

  load: function(){
    // do I need to manually load the project children like this?
    //GeneData.store.find(GeneData.PROJECTS_QUERY);

    var schemes = GeneData.store.find(GeneData.SCHEMES_QUERY).toArray();
    var schemeList =  SC.Object.create(SC.TreeItemContent, {
      treeItemIsGrouped: YES,
      treeItemChildren: schemes,
      count: schemes.get('length'),
    });
  
    this.set('content', schemes);
    GeneData.sourceController.set('content', schemeList);
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      GeneData.sendAction('loadingComplete');
    } else if (this.get('status' & SC.Record.ERROR)) {
      GeneData.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
