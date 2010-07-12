// ==========================================================================
// Project:   GeneData
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
GeneData = SC.Application.create(
  /** @scope GeneData.prototype */ {

  NAMESPACE: 'GeneData',
  VERSION: '0.1.0',

  //store: SC.Store.create().from(SC.Record.fixtures)
  store: SC.Store.create({
  	commitRecordsAutomatically: NO
  }).from('Slimarray.DataSource')

}) ;
