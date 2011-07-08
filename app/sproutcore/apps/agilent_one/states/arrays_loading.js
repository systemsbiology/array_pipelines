// ==========================================================================
// Project:   AgilentOne.ARRAYS_LOADING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
AgilentOne.ARRAYS_LOADING = SC.Responder.create(
/** @scope AgilentOne.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  loadingView: null,
  
  didBecomeFirstResponder: function() {
    AgilentOne.availableMicroarraysController.set('selection', []);

    var loadingView = SC.LabelView.create({
      classNames: 'arrays-loading-message'.w(),
      layout: { left: 4, top: 4 },
      value: 'Loading...'
    });
	
    // save this so it can be removed later
    this.set('loadingView', loadingView);
    AgilentOne.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.splitView.topLeftView.availableScroll')
      .appendChild(loadingView);
	  
    AgilentOne.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    AgilentOne.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.splitView.topLeftView.availableScroll')
      .removeChild( this.get('loadingView') );
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    AgilentOne.makeFirstResponder(AgilentOne.ARRAYS_FAILED);
  }
  
}) ;
