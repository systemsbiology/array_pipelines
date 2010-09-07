// ==========================================================================
// Project:   ChipAnalytics
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
ChipAnalytics = SC.Application.create(
  /** @scope ChipAnalytics.prototype */ {

  NAMESPACE: 'ChipAnalytics',
  VERSION: '0.1.0',

  store: SC.Store.create({
  	commitRecordsAutomatically: NO
  }).from('Slimarray.DataSource')

}) ;
