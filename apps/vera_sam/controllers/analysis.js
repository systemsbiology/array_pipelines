// ==========================================================================
// Project:   VeraSam.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
VeraSam.analysisController = SC.ObjectController.create(/** @scope VeraSam.analysisController.prototype */{
  jobID: null,
  timer: null,
  hyperlink: null,
  
  submitJob: function(){
    var microarrays = VeraSam.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'vera-sam-pipeline',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      dataHash['microarrays'].pushObject({
        'name': microarray.get('name'),
        'raw_data_path': microarray.get('rawDataPath'),
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
      this.set('jobID', response.get('body')['job']['id']);
      
      var timer = SC.Timer.schedule({
        target: this,
        action: 'checkStatus',
        interval: 5000,
        repeats: YES
      });
	  
	  this.set('timer', timer);
    }
    else 
      VeraSam.sendAction('failed');
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
      var job = response.get('body')['job'];
      
      if (job['status'] == 'completed') {
        this.set('hyperlink', '<a href="' + job['output']+ '" target="_blank">Result Zip File</a>');
        
        VeraSam.sendAction('complete')
      }
    }
    else {
      VeraSam.sendAction('failed');
    }
  }
});