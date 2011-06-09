// ==========================================================================
// Project:   ChipAnalytics.projectsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
ChipAnalytics.projectsController = SC.ArrayController.create(
/** @scope ChipAnalytics.projectsController.prototype */ {

  load: function(){
    var projects = ChipAnalytics.store.find(Slimarray.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    ChipAnalytics.sendAction('loadingComplete');
  }.observes('status'),
}) ;
