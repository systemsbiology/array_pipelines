// ==========================================================================
// Project:   VeraSam.projectsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
VeraSam.projectsController = SC.ArrayController.create(
/** @scope VeraSam.projectsController.prototype */ {

  load: function(){
    var projects = VeraSam.store.find(Slimarray.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    VeraSam.sendAction('loadingComplete');
  }.observes('status'),
}) ;
