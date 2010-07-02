// ==========================================================================
// Project:   GeneData.Microarray Fixtures
// Copyright: ©2010 Institute for Systems Biology
// ==========================================================================
/*globals GeneData */

sc_require('models/microarray');

GeneData.Microarray.FIXTURES = [

  { guid: 1,
    name: "1 hour",
    scheme: 1,
    project: 1,
    chipName: "251234510001_1_1",
    rawDataPath: "/path/to/file1.txt",
    arrayNumber: 1,
    schemedDescriptors: { "Time": 1 }
  },

  { guid: 2,
    name: "2 hour",
    scheme: 1,
    project: 1,
    chipName: "251234510001_1_2",
    rawDataPath: "/path/to/file2.txt",
    arrayNumber: 2,
    schemedDescriptors: { "Time": 2 }
  },

  { guid: 3,
    name: "3 hour",
    scheme: 1,
    project: 1,
    chipName: "251234510001_1_3",
    rawDataPath: "/path/to/file3.txt",
    arrayNumber: 3,
    schemedDescriptors: { "Time": 3 }
  },

  { guid: 4,
    name: "4 hour",
    scheme: 2,
    project: 3,
    chipName: "251234510001_1_4",
    rawDataPath: "/path/to/file4.txt",
    arrayNumber: 4,
    schemedDescriptors: { "Time": 4 }
  },

];
