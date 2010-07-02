// ==========================================================================
// Project:   GeneData.Scheme Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

sc_require('models/scheme');

GeneData.Scheme.FIXTURES = [

  { id: 1,
    projects: [1,2],
    name: "Yeast Time Course"},
  
  { id: 2,
    projects: [3],
    name: "ChIP"},
  
  { id: 3,
    projects: [1],
    name: "Mouse Knockouts"},
  
];
