// ==========================================================================
// Project:   GeneData.ARRAYS_LOADING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
GeneData.ARRAYS_LOADING = SC.Responder.create(
/** @scope GeneData.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  loadingView: null,
  
  didBecomeFirstResponder: function() {
  	GeneData.availableMicroarraysController.set('selection', []);
		
  	var loadingView = SC.LabelView.create({
	  classNames: 'arrays-loading-message'.w(),
	  layout: { left: 4, top: 4 },
	  value: 'Loading...'
	})
	
  	// save this so it can be removed later
	this.set('loadingView', loadingView);
  	GeneData.mainPage.getPath('schemesLoaded.mainView.bottomRightView.availableScroll')
	  .appendChild(loadingView);
	  
    GeneData.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    GeneData.mainPage.getPath('schemesLoaded.mainView.bottomRightView.availableScroll')
	  .removeChild( this.get('loadingView') );
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    GeneData.makeFirstResponder(GeneData.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    GeneData.makeFirstResponder(GeneData.ARRAYS_FAILED);
  },
  
}) ;
