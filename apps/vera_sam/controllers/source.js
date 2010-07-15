// ==========================================================================
// Project:   VeraSam.sourceController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class
 (Document Your Controller Here)
 @extends SC.TreeController
 */
VeraSam.sourceController = SC.TreeController.create(/** @scope VeraSam.sourceController.prototype */
{

  allowsMultipleSelection: NO,
  
  populateContent: function(){
    var labGroup, ret = [], root;

    VeraSam.labGroupsController.forEach(function(labGroup){
      var children = [];
      
	  var projects = labGroup.get('projects').sortProperty('name');
      projects.forEach(function(project){
        if (project.get('status') !== SC.Record.ERROR) {
          children.push(VeraSam.store.createRecord(Slimarray.NestedProject, {
            name: project.get('name'),
            project: project.get('id'),
            labGroup: labGroup.get('id'),
          }));
        }
      });
      
      ret.push(SC.Object.create(SC.TreeItemContent, {
        name: labGroup.get('name'),
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
