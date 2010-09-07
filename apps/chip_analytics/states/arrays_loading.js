// ==========================================================================
// Project:   ChipAnalytics.ARRAYS_LOADING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
ChipAnalytics.ARRAYS_LOADING = SC.Responder.create(
/** @scope ChipAnalytics.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  loadingView: null,
  
  didBecomeFirstResponder: function() {
  	ChipAnalytics.availableMicroarraysController.set('selection', []);
	
  	var loadingView = SC.LabelView.create({
	  classNames: 'arrays-loading-message'.w(),
	  layout: { left: 4, top: 4 },
	  value: 'Loading...'
	})
	
  	// save this so it can be removed later
	this.set('loadingView', loadingView);
  	ChipAnalytics.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.availableScroll')
	  .appendChild(loadingView);
	  
    ChipAnalytics.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    ChipAnalytics.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.availableScroll')
	  .removeChild( this.get('loadingView') );
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    ChipAnalytics.makeFirstResponder(ChipAnalytics.ARRAYS_FAILED);
  },
  
}) ;
