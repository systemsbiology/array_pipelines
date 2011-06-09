// ==========================================================================
// Project:   GeneData.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
GeneData.analysisController = SC.ObjectController.create(Slimarray.Analyzable, {
  /** @scope GeneData.analysisController.prototype */
  
  // set this for use in mixin functions
  application: GeneData,

  submitJob: function(){
    var microarrays = GeneData.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'genedata-import-generator',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      var name = microarray.get('name'),
          hybDate = microarray.get('hybridizationDate');
        
      name = hybDate.replace(/\//g, "") + "_" + name;

      dataHash.microarrays.pushObject({
        'name': name, 
        'chip_name': microarray.get('chipName'),
        'raw_data_path': microarray.get('rawDataPath'),
        'array_number': microarray.get('arrayNumber'),
        'schemed_descriptors': microarray.get('schemedDescriptors')
      });
    });
    
    SC.Request.postUrl('/pipelines/jobs').header({
      'Accept': 'application/json'
    }).json().notify(this, this.didSubmitJob).send({
      'job': dataHash
    });
  }
});
