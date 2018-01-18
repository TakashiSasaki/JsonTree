var JsonTree = require ("./Summary.js")
var summary = new JsonTree.Summary();

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

summary.parse(testObject);
console.log(summary.arrayDepths);
console.log(summary.objectDepths);
console.log(summary.indexCounts);
console.log(summary.propertyCounts);
console.log(summary.leafCount);

console.log(JsonTree.computeSummary(testObject));
