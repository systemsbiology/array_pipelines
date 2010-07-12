// ==========================================================================
// Project:   Downloader.ARRAYS_LOADING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Downloader */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
Downloader.ARRAYS_LOADING = SC.Responder.create(
/** @scope Downloader.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  loadingView: null,
  
  didBecomeFirstResponder: function() {
  	var loadingView = SC.LabelView.create({
	  classNames: 'arrays-loading-message'.w(),
	  layout: { left: 4, top: 4 },
	  value: 'Loading...'
	})
	
  	// save this so it can be removed later
	this.set('loadingView', loadingView);
  	Downloader.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.availableScroll')
	  .appendChild(loadingView);
	  
    Downloader.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    Downloader.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.availableScroll')
	  .removeChild( this.get('loadingView') );
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    Downloader.makeFirstResponder(Downloader.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    Downloader.makeFirstResponder(Downloader.ARRAYS_FAILED);
  },
  
}) ;
