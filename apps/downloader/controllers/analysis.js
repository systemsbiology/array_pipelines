// ==========================================================================
// Project:   Downloader.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
Downloader.analysisController = SC.ObjectController.create(/** @scope Downloader.analysisController.prototype */{
  jobID: null,
  timer: null,
  hyperlink: null,
  failureMessage: null,
  
  submitJob: function(){
    var microarrays = Downloader.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'array-file-packager',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      var original_name = microarray.get('rawDataPath'),
          name = microarray.get('hybridizationDate') + "_" + microarray.get('name');
        
      dataHash.microarrays.pushObject({
        'new_name': new_name,
        'original_name': original_name
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
    } else {
      Downloader.sendAction('failed');
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
        
        Downloader.sendAction('complete');
      }
      else if (job.status == 'failed') {
        this.set('failureMessage', job.message);

        Downloader.sendAction('failed');
      }
    }
    else {
      Downloader.sendAction('failed');
    }
  }
});
