// ==========================================================================
// Project:   AgilentOne.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
AgilentOne.analysisController = SC.ObjectController.create(/** @scope AgilentOne.analysisController.prototype */{
  jobID: null,
  timer: null,
  hyperlink: null,
  failureMessage: null,
  
  submitJob: function(){
    var microarrays = AgilentOne.selectedMicroarraysController.get('content'),
        dataHash = {
          'pipeline': 'agilent-one-color-normalizer',
          'microarrays': []
        };
    
    microarrays.forEach(function(microarray){
      var name = microarray.get('name'),
          hybDate = microarray.get('hybridizationDate');
        
      name = hybDate.replace("/","","g") + "_" + name;

      dataHash.microarrays.pushObject({
        'name': name,
        'original_name': microarray.get('rawDataPath')
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
      AgilentOne.sendAction('failed');
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
        
        AgilentOne.sendAction('complete');
      }
      else if (job.status == 'failed') {
        this.set('failureMessage', job.message);

        AgilentOne.sendAction('failed');
      }
    }
    else {
      AgilentOne.sendAction('failed');
    }
  }
});
