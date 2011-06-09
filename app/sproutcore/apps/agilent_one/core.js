// ==========================================================================
// Project:   AgilentOne
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
AgilentOne = SC.Application.create(
  /** @scope AgilentOne.prototype */ {

  NAMESPACE: 'AgilentOne',
  VERSION: '0.1.0',

  store: SC.Store.create({
  	commitRecordsAutomatically: NO
  }).from('Slimarray.DataSource')

}) ;
