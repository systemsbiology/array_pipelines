// ==========================================================================
// Project:   GeneData.Microarray
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  SLIMarray microarray

  @extends SC.Record
  @version 0.1
*/
GeneData.Microarray = SC.Record.extend(
/** @scope GeneData.Microarray.prototype */ {

  name: SC.Record.attr(String),
  project: SC.Record.toOne('GeneData.Project'),
  scheme: SC.Record.toOne('GeneData.Scheme'),
  chipName: SC.Record.attr(String),
  rawDataPath: SC.Record.attr(String),
  arrayNumber: SC.Record.attr(String),
  schemedDescriptors: SC.Record.attr(Object),

}) ;
