// ==========================================================================
// Project:   TilingExpression.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
TilingExpression.analysisController = SC.ObjectController.create(/** @scope TilingExpression.analysisController.prototype */{
  jobID: null,
  timer: null,
  hyperlink: null,
  
  submitJob: function(){
    var microarrays = TilingExpression.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'agilent-tiling-expression',
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
      TilingExpression.sendAction('failed');
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
        
        TilingExpression.sendAction('complete')
      }
    }
    else {
      TilingExpression.sendAction('failed');
    }
  }
});
