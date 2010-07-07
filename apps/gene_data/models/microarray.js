// ==========================================================================
// Project:   GeneData.Microarray
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  SLIMarray microarray

  @extends SC.Record
  @version 0.1
*/
GeneData.Microarray = SC.Record.extend(
/** @scope GeneData.Microarray.prototype */ {
	
  primaryKey: 'id',
  
  name: SC.Record.attr(String),
  project: SC.Record.toOne('GeneData.Project'),
  scheme: SC.Record.toOne('GeneData.Scheme'),
  chipName: SC.Record.attr(String, {key: 'chip_name'}),
  rawDataPath: SC.Record.attr(String, {key: 'raw_data_path'}),
  arrayNumber: SC.Record.attr(String, {key: 'array_number'}),
  schemedDescriptors: SC.Record.attr(Object, {key: 'schemed_descriptors'}),

}) ;
