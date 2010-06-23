// ==========================================================================
// Project:   GeneData.Project
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
GeneData.Project = SC.Record.extend(SC.TreeItemContent,
/** @scope GeneData.Project.prototype */ {

  name: SC.Record.attr(String),
  scheme: SC.Record.toOne('GeneData.Scheme'),
  hybridizations: SC.Record.toMany('GeneData.Hybridization'),

  count: 0, // no children
  treeItemChildren: [],
  treeItemIsExpanded: NO,
}) ;

GeneData.PROJECTS_QUERY = SC.Query.local(GeneData.Project);
