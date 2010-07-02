// ==========================================================================
// Project:   GeneData.projectsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
GeneData.projectsController = SC.ArrayController.create(
/** @scope GeneData.projectsController.prototype */ {

  load: function(){
    var projects = GeneData.store.find(GeneData.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    GeneData.sendAction('loadingComplete');
  }.observes('status'),
}) ;
