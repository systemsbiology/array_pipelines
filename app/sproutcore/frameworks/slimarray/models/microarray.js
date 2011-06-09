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
  labGroup: SC.Record.toOne('Slimarray.LabGroup', {key: 'lab_group'}),
  chipName: SC.Record.attr(String, {key: 'chip_name'}),
  rawDataPath: SC.Record.attr(String, {key: 'raw_data_path'}),
  arrayNumber: SC.Record.attr(String, {key: 'array_number'}),
  schemedDescriptors: SC.Record.attr(Object, {key: 'schemed_descriptors'}),
  platform: SC.Record.attr(String, {key: 'platform_name'}),
  hybridizationDate: SC.Record.attr(String, {key: 'hybridization_date'}),
  
  displayName: function() {
    return this.get('hybridization_date') + " - " + this.get('name');
  }.property('name','hybridizationDate'),

  icon: function(){
    var platform = this.get('platform');

    if(platform == "Affymetrix") {
      return 'icon-affymetrix-16';
    } else if(platform == "Agilent") {
      return 'icon-agilent-16';
    } else if(platform == "Exiqon") {
      return 'icon-exiqon-16';
    }
  }.property('platform').cacheable()
}) ;
