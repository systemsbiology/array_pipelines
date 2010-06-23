// ==========================================================================
// Project:   GeneData.Project Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals GeneData */

sc_require('models/project');

GeneData.Project.FIXTURES = [

  { guid: 1,
    scheme: 1,
    hybridizations: [1,2,3],
    name: "wild-type yeast" },

  { guid: 2,
    scheme: 1,
    hybridizations: [],
    name: "mutant yeast" },

  { guid: 3,
    scheme: 2,
    hybridizations: [4],
    name: "Pol II" },

];
