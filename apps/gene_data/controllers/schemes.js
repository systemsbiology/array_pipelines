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
    var schemes = GeneData.store.find(GeneData.SCHEMES_QUERY);
  
    this.set('content', schemes);
  },

  statusDidChange: function() {
  	GeneData.sendAction('loadingComplete');
  }.observes('status'),
}) ;
