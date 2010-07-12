// ==========================================================================
// Project:   Slimarray.Scheme
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @class

  SLIMarray naming scheme

  @extends SC.Record
  @version 0.1
*/
Slimarray.Scheme = SC.Record.extend(SC.TreeItemContent,
/** @scope Slimarray.Scheme.prototype */ {

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

Slimarray.SCHEMES_QUERY = SC.Query.local(Slimarray.Scheme);
