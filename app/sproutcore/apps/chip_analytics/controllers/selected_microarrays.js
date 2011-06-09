// ==========================================================================
// Project:   ChipAnalytics.selectedMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
ChipAnalytics.selectedMicroarraysController = SC.ArrayController.create(
/** @scope ChipAnalytics.selectedMicroarraysController.prototype */ {

  orderBy: 'displayName',

  add: function() {
    var currentMicroarrays = this.get('content');

    var addedMicroarrays = ChipAnalytics.availableMicroarraysController.get('selection').toArray();
    //var labGroupProject = ChipAnalytics.labGroupController.get('content').firstObject();
    //for (i = 0; i < addedMicroarrays.get('length'); i++) {
    //  addedMicroarrays.set('labGroupProject', labGroupProject.get('guid'));
    //}

    currentMicroarrays = currentMicroarrays ? currentMicroarrays.pushObjects(addedMicroarrays) : addedMicroarrays;
    
    availableMicroarrays = ChipAnalytics.availableMicroarraysController.get('content').toArray();
    availableMicroarrays.removeObjects(addedMicroarrays);
	ChipAnalytics.availableMicroarraysController.set('content', availableMicroarrays);
    ChipAnalytics.availableMicroarraysController.set('content', availableMicroarrays);
    ChipAnalytics.availableMicroarraysController.set('selection', SC.SelectionSet.create());

    this.set('content', currentMicroarrays);
  },

  remove: function() {
    var project;
    var currentMicroarrays = this.get('content');
    var removedMicroarrays = this.get('selection').toArray();
    currentMicroarrays = currentMicroarrays ? currentMicroarrays.removeObjects(removedMicroarrays) : null;

    availableMicroarrays = ChipAnalytics.availableMicroarraysController.get('content');
    removedMicroarrays.forEach(function(microarray) {
      labGroupProject = ChipAnalytics.store.find(
        SC.Query.local(Slimarray.NestedProject, "labGroup = {s} AND project = {p}",
        {s: microarray.get('labGroup'), p: microarray.get('project')})
      ).firstObject();
      labGroupProject.get('microarrays').pushObject(microarray);
    });

    this.set('content', currentMicroarrays);
    this.set('selection', SC.SelectionSet.create());
  },

  hasArrays: function() {
    if(this.get('length') > 0) return true
    else return false
  }.property('length'),
}) ;
