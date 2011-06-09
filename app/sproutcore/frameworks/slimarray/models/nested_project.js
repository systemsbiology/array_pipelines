// ==========================================================================
// Project:   Slimarray.NestedProject
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @class

  A model for projects that are nested under schemes. This is a "virtual" model,
  so it's not tied to any actual data in the store.

  @extends SC.Record
  @version 0.1
*/
Slimarray.NestedProject = SC.Record.extend(
/** @scope Slimarray.NestedProject.prototype */ {

  name: SC.Record.attr(String),
  project: SC.Record.toOne('Slimarray.Project'),
  scheme: SC.Record.toOne('Slimarray.Scheme'),
  labGroup: SC.Record.toOne('Slimarray.LabGroup'),
  microarrays: new Array()

}) ;
