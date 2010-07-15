// ==========================================================================
// Project:   VeraSam
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
VeraSam = SC.Application.create(
  /** @scope VeraSam.prototype */ {

  NAMESPACE: 'VeraSam',
  VERSION: '0.1.0',

  //store: SC.Store.create().from(SC.Record.fixtures)
  store: SC.Store.create({
  	commitRecordsAutomatically: NO
  }).from('Slimarray.DataSource')

}) ;
