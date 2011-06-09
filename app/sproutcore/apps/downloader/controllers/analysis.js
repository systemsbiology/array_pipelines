// ==========================================================================
// Project:   Downloader.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
Downloader.analysisController = SC.ObjectController.create(Slimarray.Analyzable, {
  /** @scope Downloader.analysisController.prototype */

  // set this for use in mixin functions
  application: Downloader,

  submitJob: function(){
    var microarrays = Downloader.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'array-file-packager',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      var original_name = microarray.get('rawDataPath'),
          name = microarray.get('name'),
          hybDate = microarray.get('hybridizationDate'),
          new_name;
        
      new_name = hybDate.replace(/\//g, "") + "_" + name;

      dataHash.microarrays.pushObject({
        'new_name': new_name,
        'original_name': original_name
      });
    });
    
    this.set('jobInfo', SC.json.encode(dataHash));

    SC.Request.postUrl('/pipelines/jobs').header({
      'Accept': 'application/json'
    }).json().notify(this, this.didSubmitJob).send({
      'job': dataHash
    });
  }
});
