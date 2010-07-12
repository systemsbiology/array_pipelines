// ==========================================================================
// Project:   Slimarray.Project Fixtures
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals Slimarray */

sc_require('models/project');

Slimarray.Project.FIXTURES = [

  { id: 1,
    microarrays: [1,2,3],
    name: "wild-type yeast" },

  { id: 2,
    microarrays: [],
    name: "mutant yeast" },

  { id: 3,
    microarrays: [4],
    name: "Pol II" },

];
