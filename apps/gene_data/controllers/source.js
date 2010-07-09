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
    
    // First entry for no naming scheme
    var schemelessProjects = GeneData.store.find(
      SC.Query.create({
        recordType: GeneData.Project,
        conditions: 'naming_scheme=nil',
        orderBy: 'name ASC'
      })
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

    GeneData.schemesController.forEach(function(scheme){
      var children = [];
      
	  var projects = scheme.get('projects').sortProperty('name');
      projects.forEach(function(project){
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

    root = SC.Object.create(SC.TreeItemContent, {
      treeItemIsGrouped: YES,
      treeItemChildren: ret,
    });
    
    this.set('content', root);
  },

});
