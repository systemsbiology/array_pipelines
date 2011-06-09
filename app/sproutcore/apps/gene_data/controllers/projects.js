// ==========================================================================
// Project:   GeneData.projectsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
GeneData.projectsController = SC.ArrayController.create(
/** @scope GeneData.projectsController.prototype */ {

  load: function(){
    var projects = GeneData.store.find(Slimarray.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    GeneData.sendAction('loadingComplete');
  }.observes('status'),
}) ;
