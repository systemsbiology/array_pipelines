// ==========================================================================
// Project:   AgilentOne
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals AgilentOne */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
AgilentOne.main = function main() {

  // show mainPage
  AgilentOne.getPath('mainPage.mainPane').append() ;

  // Go into the initial state
  AgilentOne.makeFirstResponder(AgilentOne.LAB_GROUPS_LOADING);

} ;

function main() { AgilentOne.main(); }
