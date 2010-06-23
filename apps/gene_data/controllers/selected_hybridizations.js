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

  add: function() {
    var currentHybridizations = this.get('content');
    var addedHybridizations = GeneData.availableHybridizationsController.get('selection').toArray();
    currentHybridizations = currentHybridizations ? currentHybridizations.pushObjects(addedHybridizations) : addedHybridizations;
    
    availableHybridizations = GeneData.availableHybridizationsController.get('content');
    availableHybridizations.removeObjects(addedHybridizations);
    GeneData.availableHybridizationsController.set('content', availableHybridizations);

    this.set('content', currentHybridizations);
  },

  remove: function() {
    var currentHybridizations = this.get('content');
    var removedHybridizations = this.get('selection').toArray();
    currentHybridizations = currentHybridizations ? currentHybridizations.removeObjects(removedHybridizations) : null;

    availableHybridizations = GeneData.availableHybridizationsController.get('content');
    availableHybridizations.pushObjects(removedHybridizations);
    GeneData.availableHybridizationsController.set('content', availableHybridizations);

    this.set('content', currentHybridizations);
  }

}) ;
