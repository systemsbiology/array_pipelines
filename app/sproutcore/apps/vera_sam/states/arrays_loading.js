// ==========================================================================
// Project:   VeraSam.ARRAYS_LOADING
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals VeraSam */

/** @class

  (Document Your State Here)

  @extends SC.Responder
  @version 0.1
*/
VeraSam.ARRAYS_LOADING = SC.Responder.create(
/** @scope VeraSam.ARRAYS_LOADING.prototype */ {

  /**
    The next state to check if this state does not implement the action.
  */
  nextResponder: null,
  
  loadingView: null,
  
  didBecomeFirstResponder: function() {
    VeraSam.availableMicroarraysController.set('selection', []);

    var loadingView = SC.LabelView.create({
      classNames: 'arrays-loading-message'.w(),
      layout: { left: 4, top: 4 },
      value: 'Loading...'
    });

    // save this so it can be removed later
    this.set('loadingView', loadingView);
    VeraSam.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.splitView.topLeftView.availableScroll')
      .appendChild(loadingView);

    VeraSam.availableMicroarraysController.load();
  },
  
  willLoseFirstResponder: function() {
    VeraSam.mainPage.getPath('labGroupsLoaded.mainView.bottomRightView.splitView.topLeftView.availableScroll')
      .removeChild( this.get('loadingView') );
  },
  
  // ..........................................................
  // EVENTS
  //
  
  loadingComplete: function() {
    VeraSam.makeFirstResponder(VeraSam.ARRAYS_LOADED);
  },

  loadingFailed: function() {
    VeraSam.makeFirstResponder(VeraSam.ARRAYS_FAILED);
  },
  
}) ;
