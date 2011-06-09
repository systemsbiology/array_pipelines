// ==========================================================================
// Project:   TilingExpression.ARRAYS_LOADING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
TilingExpression.ARRAYS_LOADING = SC.Responder.create(
/** @scope TilingExpression.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  loadingView: null,
  
  didBecomeFirstResponder: function() {
  	TilingExpression.availableMicroarraysController.set('selection', []);
	
  	var loadingView = SC.LabelView.create({
	  classNames: 'arrays-loading-message'.w(),
	  layout: { left: 4, top: 4 },
	  value: 'Loading...'
	})
	
  	// save this so it can be removed later
	this.set('loadingView', loadingView);
  	TilingExpression.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.availableScroll')
	  .appendChild(loadingView);
	  
    TilingExpression.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    TilingExpression.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.availableScroll')
	  .removeChild( this.get('loadingView') );
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    TilingExpression.makeFirstResponder(TilingExpression.ARRAYS_FAILED);
  },
  
}) ;
