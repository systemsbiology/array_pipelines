// ==========================================================================
// Project:   Slimarray.User
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Slimarray */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Slimarray.User = SC.Record.extend(
/** @scope Slimarray.User.prototype */ {

   primaryKey: 'id',

   login: SC.Record.attr(String),

   email: SC.Record.attr(String)

}) ;

Slimarray.USER_QUERY = SC.Query.local(Slimarray.User);
