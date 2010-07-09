// ==========================================================================
// Project:   GeneData.sourceController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class
 (Document Your Controller Here)
 @extends SC.TreeController
 */
GeneData.sourceController = SC.TreeController.create(/** @scope GeneData.sourceController.prototype */
{

  allowsMultipleSelection: NO,
  
  populateContent: function(){
    var scheme, ret = [], root;
    
    GeneData.schemesController.forEach(function(scheme){
      var children = [];
      
      scheme.get('projects').forEach(function(project){
        if (project.get('status') !== SC.Record.ERROR) {
          children.push(GeneData.store.createRecord(GeneData.SchemeProject, {
            name: project.get('name'),
            project: project.get('id'),
            scheme: scheme.get('id'),
          }));
        }
      });
      
      ret.push(SC.Object.create(SC.TreeItemContent, {
        name: scheme.get('name'),
        treeItemChildren: children,
        treeItemIsExpanded: NO,
      }));
    });

    // Add a final entry for no naming scheme
    var schemelessProjects = GeneData.store.find(
      SC.Query.local(GeneData.Project, "naming_scheme=nil")
    );

    var children = [];
    schemelessProjects.forEach(function(project){
      if (project.get('status') !== SC.Record.ERROR) {
        children.push(GeneData.store.createRecord(GeneData.SchemeProject, {
          name: project.get('name'),
          project: project.get('id'),
        }));
      }
    });
    
    ret.push(SC.Object.create(SC.TreeItemContent, {
      name: 'No Naming Scheme',
      treeItemChildren: children,
      treeItemIsExpanded: NO,
    }));

    
    root = SC.Object.create(SC.TreeItemContent, {
      treeItemIsGrouped: YES,
      treeItemChildren: ret,
    });
    
    this.set('content', root);
  },

});
