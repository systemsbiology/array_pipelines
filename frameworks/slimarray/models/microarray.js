// ==========================================================================
// Project:   Slimarray.Microarray
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @class

  SLIMarray microarray

  @extends SC.Record
  @version 0.1
*/
Slimarray.Microarray = SC.Record.extend(
/** @scope Slimarray.Microarray.prototype */ {
	
  primaryKey: 'id',
  
  name: SC.Record.attr(String),
  project: SC.Record.toOne('Slimarray.Project'),
  scheme: SC.Record.toOne('Slimarray.Scheme'),
  chipName: SC.Record.attr(String, {key: 'chip_name'}),
  rawDataPath: SC.Record.attr(String, {key: 'raw_data_path'}),
  arrayNumber: SC.Record.attr(String, {key: 'array_number'}),
  schemedDescriptors: SC.Record.attr(Object, {key: 'schemed_descriptors'}),

}) ;
