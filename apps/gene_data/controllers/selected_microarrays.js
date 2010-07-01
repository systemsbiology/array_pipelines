// ==========================================================================
// Project:   GeneData.selectedMicroarraysController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
GeneData.selectedMicroarraysController = SC.ArrayController.create(
/** @scope GeneData.selectedMicroarraysController.prototype */ {

  orderBy: 'name',

  add: function() {
    var currentMicroarrays = this.get('content');

    var addedMicroarrays = GeneData.availableMicroarraysController.get('selection').toArray();
    //var schemeProject = GeneData.schemeController.get('content').firstObject();
    //for (i = 0; i < addedMicroarrays.get('length'); i++) {
    //  addedMicroarrays.set('schemeProject', schemeProject.get('guid'));
    //}

    currentMicroarrays = currentMicroarrays ? currentMicroarrays.pushObjects(addedMicroarrays) : addedMicroarrays;
    
    availableMicroarrays = GeneData.availableMicroarraysController.get('content');
    availableMicroarrays.removeObjects(addedMicroarrays);
    GeneData.availableMicroarraysController.set('content', availableMicroarrays);
    GeneData.availableMicroarraysController.set('selection', SC.SelectionSet.create());

    this.set('content', currentMicroarrays);
  },

  remove: function() {
    var project;
    var currentMicroarrays = this.get('content');
    var removedMicroarrays = this.get('selection').toArray();
    currentMicroarrays = currentMicroarrays ? currentMicroarrays.removeObjects(removedMicroarrays) : null;

    availableMicroarrays = GeneData.availableMicroarraysController.get('content');
    removedMicroarrays.forEach(function(microarray) {
      schemeProject = GeneData.store.find(
        SC.Query.local(GeneData.SchemeProject, "scheme = {s} AND project = {p}",
        {s: microarray.get('scheme'), p: microarray.get('project')})
      ).firstObject();
      schemeProject.get('microarrays').pushObject(microarray);
    });

    this.set('content', currentMicroarrays);
    this.set('selection', SC.SelectionSet.create());
  },

  hasArrays: function() {
    if(this.get('length') > 0) return true
    else return false
  }.property('length'),
}) ;