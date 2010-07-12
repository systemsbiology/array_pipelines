// ==========================================================================
// Project:   Slimarray.Scheme Fixtures
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

sc_require('models/scheme');

Slimarray.Scheme.FIXTURES = [

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
