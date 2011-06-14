// ==========================================================================
// Project:   TilingExpression.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
TilingExpression.analysisController = SC.ObjectController.create(Slimarray.Analyzable, {
  /** @scope TilingExpression.analysisController.prototype */

  // set this for use in mixin functions
  application: TilingExpression,
  
  submitJob: function(){
    var user = TilingExpression.usersController.get('content').firstObject();
    var project = TilingExpression.nestedProjectController.get('content').firstObject().get('project');

    var microarrays = TilingExpression.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'agilent-tiling-expression',
      'login': user.get('login'),
      'email': user.get('email'),
      'project_id': project.get('id'),
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
