// ==========================================================================
// Project:   TilingExpression.selectedMicroarraysController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
TilingExpression.selectedMicroarraysController = SC.ArrayController.create(
/** @scope TilingExpression.selectedMicroarraysController.prototype */ {

  orderBy: 'displayName',

  add: function() {
    var currentMicroarrays = this.get('content');

    var addedMicroarrays = TilingExpression.availableMicroarraysController.get('selection').toArray();

    currentMicroarrays = currentMicroarrays ? currentMicroarrays.pushObjects(addedMicroarrays) : addedMicroarrays;
    
    availableMicroarrays = TilingExpression.availableMicroarraysController.get('content').toArray();
    availableMicroarrays.removeObjects(addedMicroarrays);
    TilingExpression.availableMicroarraysController.set('content', availableMicroarrays);
    TilingExpression.availableMicroarraysController.set('selection', SC.SelectionSet.create());

    this.set('content', currentMicroarrays);
  },

  remove: function() {
    var project;
    var currentMicroarrays = this.get('content');
    var removedMicroarrays = this.get('selection').toArray();
    currentMicroarrays = currentMicroarrays ? currentMicroarrays.removeObjects(removedMicroarrays) : null;

    availableMicroarrays = TilingExpression.availableMicroarraysController.get('content');
    removedMicroarrays.forEach(function(microarray) {
      labGroupProject = TilingExpression.store.find(
        SC.Query.local(Slimarray.NestedProject, "labGroup = {s} AND project = {p}",
        {s: microarray.get('labGroup'), p: microarray.get('project')})
      ).firstObject();
      labGroupProject.get('microarrays').pushObject(microarray);
    });

    this.set('content', currentMicroarrays);
    this.set('selection', SC.SelectionSet.create());
  },

  hasArrays: function() {
    if(this.get('length') > 0) {
      return true;
    }
    else {
      return false;
    }
  }.property('length')
}) ;
