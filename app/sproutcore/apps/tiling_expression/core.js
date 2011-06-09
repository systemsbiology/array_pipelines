// ==========================================================================
// Project:   TilingExpression
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
TilingExpression = SC.Application.create(
  /** @scope TilingExpression.prototype */ {

  NAMESPACE: 'TilingExpression',
  VERSION: '0.1.0',

  store: SC.Store.create({
    commitRecordsAutomatically: NO
  }).from('Slimarray.DataSource')

}) ;
