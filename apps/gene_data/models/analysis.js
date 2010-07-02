// ==========================================================================
// Project:   GeneData.Analysis
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
GeneData.Analysis = SC.Record.extend(
/** @scope GeneData.Analysis.prototype */ {

  status: SC.Record.attr(String),
  resultUrl: SC.Record.attr(String),
  
  hyperlink: function() {
  	return ['<a href="', this.get('resultUrl'), '">Result Link</a>'];
  }.property('resultUrl').cacheable()

}) ;
