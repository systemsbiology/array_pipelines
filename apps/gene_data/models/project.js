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
	
  primaryKey: 'id',

  name: SC.Record.attr(String),

  count: 0, // no children
}) ;

GeneData.PROJECTS_QUERY = SC.Query.local(GeneData.Project);
