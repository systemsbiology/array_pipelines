// ==========================================================================
// Project:   GeneData
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
GeneData.main = function main() {

  // show mainPage
  GeneData.getPath('mainPage.mainPane').append() ;

  // Go into the initial state
  GeneData.makeFirstResponder(GeneData.SCHEMES_LOADING);

} ;

function main() { GeneData.main(); }
