// ==========================================================================
// Project:   ChipAnalytics.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
ChipAnalytics.analysisController = SC.ObjectController.create(/** @scope ChipAnalytics.analysisController.prototype */{
  jobID: null,
  timer: null,
  hyperlink: null,
  failureMessage: null,
  
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
  },
  
  didSubmitJob: function(response){
    if (SC.ok(response)) {
      this.set('jobID', response.get('body').job.id);
      
      var timer = SC.Timer.schedule({
        target: this,
        action: 'checkStatus',
        interval: 5000,
        repeats: YES
      });
	  
	  this.set('timer', timer);
    }
    else {
      ChipAnalytics.sendAction('failed');
    }
  },
  
  checkStatus: function(){
    var jobID = this.get('jobID');
    var uri = '/pipelines/jobs/' + jobID;
    
    SC.Request.getUrl(uri).header({
      'Accept': 'application/json'
    }).json().notify(this, this.didCheckStatus).send();
  },
  
  didCheckStatus: function(response){
    if (SC.ok(response)) {
      var job = response.get('body').job;
      
      if (job.status == 'completed') {
        this.set('hyperlink', '<a href="' + job.output + '" target="_blank">Result Zip File</a>');
        
        ChipAnalytics.sendAction('complete');
      }
      else if (job.status == 'failed') {
        this.set('failureMessage', job.message);

        ChipAnalytics.sendAction('failed');
      }
    }
    else {
      ChipAnalytics.sendAction('failed');
    }
  }
});
