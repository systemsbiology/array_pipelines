// ==========================================================================
// Project:   Downloader
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Downloader = SC.Application.create(
  /** @scope Downloader.prototype */ {

  NAMESPACE: 'Downloader',
  VERSION: '0.1.0',

  //store: SC.Store.create().from(SC.Record.fixtures)
  store: SC.Store.create({
    commitRecordsAutomatically: NO
  }).from('Slimarray.DataSource')

}) ;
