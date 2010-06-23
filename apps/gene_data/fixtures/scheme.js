// ==========================================================================
// Project:   GeneData.Scheme Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

sc_require('models/scheme');

GeneData.Scheme.FIXTURES = [

  { guid: 1,
    projects: [1,2],
    name: "Yeast Time Course"},
  
  { guid: 2,
    projects: [3],
    name: "ChIP"},
  
  { guid: 3,
    projects: [],
    name: "Mouse Knockouts"},
  
];
