// ==========================================================================
// Project:   TilingExpression
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals TilingExpression */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
TilingExpression.main = function main() {

  // show mainPage
  TilingExpression.getPath('mainPage.mainPane').append() ;

  // Go into the initial state
  TilingExpression.makeFirstResponder(TilingExpression.LAB_GROUPS_LOADING);

} ;

function main() { TilingExpression.main(); }
