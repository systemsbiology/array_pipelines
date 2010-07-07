// ==========================================================================
// Project:   GeneData.analysisController
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class
 (Document Your Controller Here)
 @extends SC.ObjectController
 */
GeneData.analysisController = SC.ObjectController.create(/** @scope GeneData.analysisController.prototype */
{

  submitJob: function(){
    var microarrays = GeneData.selectedMicroarraysController.get('content'), dataHash = {
      'pipeline': 'GeneData',
      'microarrays': []
    };
    
    microarrays.forEach(function(microarray){
      dataHash['microarrays'].pushObject({
        'name': microarray.get('name'),
        'chip_name': microarray.get('chipName'),
        'raw_data_path': microarray.get('rawDataPath'),
        'array_number': microarray.get('arrayNumber'),
        'schemed_descriptors': microarray.get('schemedDescriptors')
      });
    });
    
    SC.Request.postUrl('/jobs').header({'Accept': 'application/json'}).json()
	  .notify(this, this.didSubmitJob)
	  .send({'job': dataHash});
  },
  
  didSubmitJob: function(response) {
  	if (SC.ok(response)) {
	  console.log("didSubmitJob ran");
	} else GeneData.sendAction('failed');
	
  }
});
