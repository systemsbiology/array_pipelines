// ==========================================================================
// Project:   AgilentOne.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
AgilentOne.analysisController = SC.ObjectController.create(Slimarray.Analyzable, {
  /** @scope AgilentOne.analysisController.prototype */

  // set this for use in mixin functions
  application: AgilentOne,

  submitJob: function(){
    var microarrays = AgilentOne.selectedMicroarraysController.get('content'),
        dataHash = {
          'pipeline': 'agilent-one-color-normalizer',
          'microarrays': []
        };
    
    microarrays.forEach(function(microarray){
      var name = microarray.get('name'),
          hybDate = microarray.get('hybridizationDate');
        
      name = hybDate.replace(/\//g, "") + "_" + name;

      dataHash.microarrays.pushObject({
        'name': name,
        'raw_data_path': microarray.get('rawDataPath')
      });
    });
    
    this.set('jobInfo', SC.json.encode(dataHash));

    SC.Request.postUrl('/pipelines/jobs').header({
      'Accept': 'application/json'
    }).json().notify(this, this.didSubmitJob).send({
      'job': dataHash
    });
  }}
);
