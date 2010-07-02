// ==========================================================================
// Project:   GeneData.SchemeProject
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  A model for projects that are nested under schemes. This is a "virtual" model,
  so it's not tied to any actual data in the store.

  @extends SC.Record
  @version 0.1
*/
GeneData.SchemeProject = SC.Record.extend(
/** @scope GeneData.SchemeProject.prototype */ {

  name: SC.Record.attr(String),
  project: SC.Record.toOne('GeneData.Project'),
  scheme: SC.Record.toOne('GeneData.Scheme'),
  microarrays: new Array(),

}) ;
