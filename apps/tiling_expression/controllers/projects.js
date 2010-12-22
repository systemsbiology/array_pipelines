// ==========================================================================
// Project:   TilingExpression.projectsController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TilingExpression.projectsController = SC.ArrayController.create(
/** @scope TilingExpression.projectsController.prototype */ {

  load: function(){
    var projects = TilingExpression.store.find(Slimarray.PROJECTS_QUERY);
  
    this.set('content', projects);
  },

  statusDidChange: function() {
    TilingExpression.sendAction('loadingComplete');
  }.observes('status'),
}) ;
