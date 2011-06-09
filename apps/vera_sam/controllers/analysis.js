// ==========================================================================
// Project:   VeraSam.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
VeraSam.analysisController = SC.ObjectController.create(Slimarray.Analyzable, {
  /** @scope VeraSam.analysisController.prototype */
  
  // set this for use in mixin functions
  application: VeraSam,

  submitJob: function(){
    var microarrays = VeraSam.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'vera-sam-pipeline',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      var name = microarray.get('name'),
          hybDate = microarray.get('hybridizationDate');

      // May turn this on if users eventually need it
      //name = hybDate.replace("/","","g") + "_" + name;

      dataHash.microarrays.pushObject({
        'name': name,
        'raw_data_path': microarray.get('rawDataPath')
      });
    });
    
    SC.Request.postUrl('/pipelines/jobs').header({
      'Accept': 'application/json'
    }).json().notify(this, this.didSubmitJob).send({
      'job': dataHash
    });
  }
});
