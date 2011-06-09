// ==========================================================================
// Project:   AgilentOne.projectsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
AgilentOne.projectsController = SC.ArrayController.create(
/** @scope AgilentOne.projectsController.prototype */ {

  load: function(){
    var projects = AgilentOne.store.find(Slimarray.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    AgilentOne.sendAction('loadingComplete');
  }.observes('status'),
}) ;
