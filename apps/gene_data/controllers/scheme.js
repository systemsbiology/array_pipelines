// ==========================================================================
// Project:   GeneData.schemeController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
GeneData.schemeController = SC.ObjectController.create(
/** @scope GeneData.schemeController.prototype */ {

  contentBinding: 'GeneData.sourceController.selection',
  hybridizations: null,

  contentPropertyDidChange: function(target, key) {
    var hybridizations,
        content;

    content = this.get('content');
    if(!content) return;
    else if(content.isEnumerable) {
      content.forEach(function(project) {
        //hybridizations = hybridizations.concat( project.get('hybridizations') );
        if(hybridizations) hybridizations.pushObjects( project.get('hybridizations') )
        else hybridizations = project.get('hybridizations') ;
      });
    } else {
      hybridizations = content.get('hybridizations');
    }

    this.set('hybridizations', hybridizations);
  },
}) ;
