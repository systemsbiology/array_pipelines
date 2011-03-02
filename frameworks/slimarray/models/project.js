// ==========================================================================
// Project:   Slimarray.Project
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Slimarray.Project = SC.Record.extend(SC.TreeItemContent,
/** @scope Slimarray.Project.prototype */ {
	
  primaryKey: 'id',

  name: SC.Record.attr(String),

  count: 0 // no children
}) ;

Slimarray.PROJECTS_QUERY = SC.Query.local(Slimarray.Project);
