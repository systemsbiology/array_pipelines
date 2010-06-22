// ==========================================================================
// Project:   GeneData.Scheme
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  SLIMarray naming scheme

  @extends SC.Record
  @version 0.1
*/
GeneData.Scheme = SC.Record.extend(
/** @scope GeneData.Scheme.prototype */ {

  name: SC.Record.attr(String),

}) ;

GeneData.SCHEMES_QUERY = SC.Query.local(GeneData.Scheme);
//GeneData.SCHEMES_QUERY = SC.Query.remote(GeneData.Scheme);
