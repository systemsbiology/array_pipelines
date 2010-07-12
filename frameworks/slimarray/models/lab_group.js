// ==========================================================================
// Project:   Slimarray.LabGroup
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Slimarray */

/** @class

  SLIMarray lab group

  @extends SC.Record
  @version 0.1
*/
Slimarray.LabGroup = SC.Record.extend(SC.TreeItemContent,
/** @scope Slimarray.LabGroup.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),
  projects: SC.Record.toMany('Slimarray.Project', {key: 'project_ids'}),

  count: function() {
    return this.getPath('projects.length') ;
  }.property('*projects.length').cacheable(),

  treeItemChildren: function() {
    return this.get('projects') ;
  }.property('projects').cacheable(),

  treeItemBranchIndexes: function() { return SC.IndexSet.EMPTY; },
  
}) ;

Slimarray.LAB_GROUPS_QUERY = SC.Query.create({recordType: Slimarray.LabGroup, orderBy: 'name ASC'});