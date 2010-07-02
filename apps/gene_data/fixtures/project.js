// ==========================================================================
// Project:   GeneData.Project Fixtures
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

sc_require('models/project');

GeneData.Project.FIXTURES = [

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
