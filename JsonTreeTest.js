var JsonTree = require ("./JsonTree.js")
var jsonTreeSummary = new JsonTree.JsonTreeSummary();

var testObject = {
  "property1" : [1,2,3],
  "property2" : {
    "property21": true,
    "property22": 1.23,
    "property23": null
  },
  "property3": [
    [111,222,333]
  ]

}

jsonTreeSummary.parse(testObject);
console.log(jsonTreeSummary.arrayDepths);
console.log(jsonTreeSummary.objectDepths);
console.log(jsonTreeSummary.indexCounts);
console.log(jsonTreeSummary.propertyCounts);
console.log(jsonTreeSummary.leafCount);

