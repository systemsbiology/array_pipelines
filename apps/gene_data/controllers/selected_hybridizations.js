// ==========================================================================
// Project:   GeneData.selectedHybridizationsController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
GeneData.selectedHybridizationsController = SC.ArrayController.create(
/** @scope GeneData.selectedHybridizationsController.prototype */ {

  orderBy: 'name',

  add: function() {
    var currentHybridizations = this.get('content');
    var addedHybridizations = GeneData.availableHybridizationsController.get('selection').toArray();
    currentHybridizations = currentHybridizations ? currentHybridizations.pushObjects(addedHybridizations) : addedHybridizations;
    
    availableHybridizations = GeneData.availableHybridizationsController.get('content');
    availableHybridizations.removeObjects(addedHybridizations);
    GeneData.availableHybridizationsController.set('content', availableHybridizations);
    GeneData.availableHybridizationsController.set('selection', SC.SelectionSet.create());

    this.set('content', currentHybridizations);
  },

  remove: function() {
    var project;
    var currentHybridizations = this.get('content');
    var removedHybridizations = this.get('selection').toArray();
    currentHybridizations = currentHybridizations ? currentHybridizations.removeObjects(removedHybridizations) : null;

    availableHybridizations = GeneData.availableHybridizationsController.get('content');
    removedHybridizations.forEach(function(hybridization) {
      project = hybridization.get('project');
      project.get('hybridizations').pushObject(hybridization);
    });

    this.set('content', currentHybridizations);
    this.set('selection', SC.SelectionSet.create());
  }

}) ;
