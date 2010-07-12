// ==========================================================================
// Project:   Slimarray.SchemeProject
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @class

  A model for projects that are nested under schemes. This is a "virtual" model,
  so it's not tied to any actual data in the store.

  @extends SC.Record
  @version 0.1
*/
Slimarray.SchemeProject = SC.Record.extend(
/** @scope Slimarray.SchemeProject.prototype */ {

  name: SC.Record.attr(String),
  project: SC.Record.toOne('Slimarray.Project'),
  scheme: SC.Record.toOne('Slimarray.Scheme'),
  microarrays: new Array(),

}) ;
