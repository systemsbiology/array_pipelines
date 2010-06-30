// ==========================================================================
// Project:   GeneData.Project Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

sc_require('models/project');

GeneData.Project.FIXTURES = [

  { guid: 1,
    microarrays: [1,2,3],
    name: "wild-type yeast" },

  { guid: 2,
    microarrays: [],
    name: "mutant yeast" },

  { guid: 3,
    microarrays: [4],
    name: "Pol II" },

];
