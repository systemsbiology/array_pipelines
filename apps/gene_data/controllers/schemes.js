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
    var schemes = GeneData.store.find(GeneData.SCHEMES_QUERY).toArray();
	GeneData.store.find(GeneData.PROJECTS_QUERY);
  
    this.set('content', schemes);
  },

  sourceRoot: function() {
    var scheme, ret = [];

    this.forEach(function(scheme) {
      var children = [];

      scheme.get('projects').forEach(function(project) {
        children.push(GeneData.store.createRecord(GeneData.SchemeProject, {
          name: project.get('name'),
          project: project.get('id'),
          scheme: scheme.get('id'),
        }));
      });

      ret.push(SC.Object.create(SC.TreeItemContent, {
        name: scheme.get('name'),
        treeItemChildren: children,
      }));
    });

    return SC.Object.create(SC.TreeItemContent, {
      treeItemIsGrouped: YES,
      treeItemChildren: ret,
      isExpanded: YES,
    });

  }.property('[]').cacheable(),

  statusDidChange: function() {
    if (this.get('status') & SC.Record.READY) {
      GeneData.sendAction('loadingComplete');
    } else if (this.get('status' & SC.Record.ERROR)) {
      GeneData.sendAction('loadingFailed');
    }
  }.observes('status'),
}) ;
