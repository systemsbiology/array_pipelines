// ==========================================================================
// Project:   ChipAnalytics
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals ChipAnalytics */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
ChipAnalytics.main = function main() {

  // show mainPage
  ChipAnalytics.getPath('mainPage.mainPane').append() ;

  // Go into the initial state
  ChipAnalytics.makeFirstResponder(ChipAnalytics.LAB_GROUPS_LOADING);

} ;

function main() { ChipAnalytics.main(); }
