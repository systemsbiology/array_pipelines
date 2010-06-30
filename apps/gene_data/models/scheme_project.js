// ==========================================================================
// Project:   GeneData.SchemeProject
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  A model for projects that are nested under schemes. This is a "virtual" model,
  so it's not tied to any actual data in the store.

  @extends SC.Record
  @version 0.1
*/
GeneData.SchemeProject = SC.Record.extend(
/** @scope GeneData.SchemeProject.prototype */ {

  name: SC.Record.attr(String),
  project: SC.Record.toOne('GeneData.Project'),
  scheme: SC.Record.toOne('GeneData.Scheme'),

  microarrays: function(key, value) {
    var microarrays = this.get('loadedMicroarrays');

    // lazily load microarrays from the store
    if(microarrays === undefined) {
      var query = SC.Query.local(GeneData.Microarray, "project = {project} AND scheme = {scheme}",
        {project: this.get('project'), scheme: this.get('scheme')});
      this.set( 'loadedMicroarrays', GeneData.store.find(query).toArray() );
    }

    if(value !== undefined) {
      this.set('loadedMicroarrays', value);
    }

    return this.get('loadedMicroarrays');
  }.property(),

}) ;
