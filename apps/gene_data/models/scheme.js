// ==========================================================================
// Project:   GeneData.Scheme
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  SLIMarray naming scheme

  @extends SC.Record
  @version 0.1
*/
GeneData.Scheme = SC.Record.extend(SC.TreeItemContent,
/** @scope GeneData.Scheme.prototype */ {

  primaryKey: 'id',
  
  name: SC.Record.attr(String),
  projects: SC.Record.toMany('GeneData.Project'),

  count: function() {
    return this.getPath('projects.length') ;
  }.property('*projects.length').cacheable(),

  treeItemChildren: function() {
    return this.get('projects') ;
  }.property('projects').cacheable(),

  treeItemBranchIndexes: function() { return SC.IndexSet.EMPTY; },
}) ;

GeneData.SCHEMES_QUERY = SC.Query.local(GeneData.Scheme);
//GeneData.SCHEMES_QUERY = SC.Query.remote(GeneData.Scheme);
