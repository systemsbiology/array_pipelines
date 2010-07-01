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

  contentBinding: 'GeneData.schemeController.microarrays',
  orderBy: 'name',

  load: function(){
    var schemeProject = GeneData.schemeController.get('content').firstObject()
    if(!schemeProject) return NO

    var query = SC.Query.local(GeneData.Microarray, "project = {project} AND scheme = {scheme}",
      {project: schemeProject.get('project'), scheme: schemeProject.get('scheme')});
    schemeProject.set( 'microarrays', GeneData.store.find(query).toArray() );
  },

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      GeneData.sendAction('loadingComplete');
    } else if (this.get('status' & SC.Record.ERROR)) {
      GeneData.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
