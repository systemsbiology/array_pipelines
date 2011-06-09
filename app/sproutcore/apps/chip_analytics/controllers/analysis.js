// ==========================================================================
// Project:   ChipAnalytics.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
ChipAnalytics.analysisController = SC.ObjectController.create(Slimarray.Analyzable, {
  /** @scope ChipAnalytics.analysisController.prototype */

  // set this for use in mixin functions
  application: ChipAnalytics,

  submitJob: function(){
    var microarrays = ChipAnalytics.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'agilent-chip-analytics',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      var name = microarray.get('name'),
          hybDate = microarray.get('hybridizationDate');
        
      // May turn this on if users eventually need it
      //name = hybDate.replace("/","","g") + "_" + name;

      dataHash.microarrays.pushObject({
        'name': name,
        'chip_name': microarray.get('chipName'),
        'raw_data_path': microarray.get('rawDataPath')
      });
    });
    
    SC.Request.postUrl('/pipelines/jobs').header({
      'Accept': 'application/json'
    }).json().notify(this, this.didSubmitJob).send({
      'job': dataHash
    });
  }}
);
