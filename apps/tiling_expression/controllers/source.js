// ==========================================================================
// Project:   TilingExpression.sourceController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class
 (Document Your Controller Here)
 @extends SC.TreeController
 */
TilingExpression.sourceController = SC.TreeController.create(/** @scope TilingExpression.sourceController.prototype */
{

  allowsMultipleSelection: NO,
  
  populateContent: function(){
    var labGroup, ret = [], root;

    TilingExpression.labGroupsController.forEach(function(labGroup){
      var children = [];
      
	  var projects = labGroup.get('projects').sortProperty('name');
      projects.forEach(function(project){
        if (project.get('status') !== SC.Record.ERROR) {
          children.push(TilingExpression.store.createRecord(Slimarray.NestedProject, {
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
