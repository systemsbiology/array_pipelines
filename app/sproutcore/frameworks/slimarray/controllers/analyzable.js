// ==========================================================================
// Project:   Slimarray.Analyzable
// Copyright: ©2011 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

/** @mixin
 * 
 * Shared functions for analysis controllers
 *
 */
Slimarray.Analyzable = {
  jobID: null,
  timer: null,
  hyperlink: null,
  failureMessage: null,
  jobInfo: null,
  
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
      this.application.sendAction('failed');
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
        
        this.application.sendAction('complete');
      }
      else if (job.status == 'failed') {
        this.set('failureMessage', job.message);

        this.application.sendAction('failed');
      }
    }
    else {
      this.application.sendAction('failed');
    }
  }
}
