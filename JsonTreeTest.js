var JsonTree = require ("./JsonTree.js")

var testObject = {
  "property1" : [1,2,3],
  "property2" : {
    "property21": true,
    "property22": 1.23,
    "property23": null
  }
}

JsonTree.parse(testObject);
