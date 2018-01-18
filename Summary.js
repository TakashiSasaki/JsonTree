"use strict";

function Summary() {

   this.primitive = {
      "number": true,
      "string": true,
      "boolean": true,
   }

   this.init = function() {
      this.indexCounts = [];
      this.propertyCounts = {};
      this.arrayDepths = [];
      this.objectDepths = [];
      this.leafCount = 0;
   }

   function incrementArray(array, index) {
      if (typeof array[index] === "undefined") {
         array[index] = 1;
      } else {
         array[index] += 1;
      }
   }

   function incrementObject(object, property) {
      if (property in object) {
         object[property] += 1;
      } else {
         object[property] = 1;
      }
   }

   this.parse = function(tree) {
      this.init();
      if (typeof tree in this.primitive) {
         throw "parse: expects object or array.";
      }

      for (var i in tree) {
         if (tree[i] === null || typeof tree[i] in this.primitive) continue;
         if (tree instanceof Array) {
            this.traverseArray(tree, 1, 0);
            continue;
         }
         if (tree instanceof Object) {
            this.traverseObject(tree, 0, 1);
            continue;
         }
         throw "parse: can parse only array or object.";
      }
      fillArray(this.indexCounts);
      fillArray(this.arrayDepths);
      fillArray(this.objectDepths);
      this.checkIntegrity();
   }

   this.traverseArray = function(array, arrayDepth, objectDepth) {
      for (var i in array) {
         if (array[i] === null || typeof array[i] in this.primitive) {
            this.leafCount += 1;
            incrementArray(this.indexCounts, i);
            incrementArray(this.arrayDepths, arrayDepth);
            incrementArray(this.objectDepths, objectDepth);
            continue;
         }
         if (array[i] instanceof Array) {
            this.traverseArray(array[i], arrayDepth + 1, objectDepth);
            continue;
         }
         if (array[i] instanceof Object) {
            this.traverseObject(array[i], arrayDepth, objectDepth + 1);
            continue;
         }
         throw "traverseArray: unexpected type in array.";
      }
   }

   this.traverseObject = function(object, arrayDepth, objectDepth) {
      for (var i in object) {
         if (object[i] === null || typeof object[i] in this.primitive) {
            this.leafCount += 1;
            incrementObject(this.propertyCounts, i);
            incrementArray(this.arrayDepths, arrayDepth);
            incrementArray(this.objectDepths, objectDepth);
            continue;
         }
         if (object[i] instanceof Array) {
            this.traverseArray(object[i], arrayDepth + 1, objectDepth);
            continue;
         }
         if (object[i] instanceof Object) {
            this.traverseObject(object[i], arrayDepth, objectDepth + 1);
            continue;
         }
         throw "traverseObject: unexpected type in object.";
      }
   } //traverseObject

   this.checkIntegrity = function() {
      var nArrayLeaf = this.indexCounts.reduce(function(x, y) {
         return x + y;
      });
      var nObjectLeaf = 0;
      for (var i in this.propertyCounts) {
         nObjectLeaf += this.propertyCounts[i];
      }
      if (this.leafCount != nObjectLeaf + nArrayLeaf) {
         throw "checkIntegrity: nObjectLeaf + nArrayLeaf != leafCount";
      }
      var nLeafByArrayDepth = this.arrayDepths.reduce(function(x, y) {
         return x + y;
      });
      if (this.leafCount != nLeafByArrayDepth) {
         throw "checkIntegrity: nLeafByArrayDepth != leafCount";
      }
      var nLeafByObjectDepth = this.objectDepths.reduce(function(x, y) {
         return x + y;
      });
      if (this.leafCount != nLeafByObjectDepth) {
         throw "checkIntegrity: nLeafByObjectDepth != leafCount";
      }
   }

} //JsonTreeSummary

function fillArray(array) {
   for (var i = 0; i < array.length; ++i) {
      if (typeof array[i] === "undefined") {
         array[i] = 0;
      }
   }
   return array;
}

var summary = new Summary();


exports["Summary"] = Summary;
exports["computeSummary"] = function(tree) {
   summary.parse(tree);
   return {
      indexCounts: summary.indexCounts,
      propertyCounts: summary.propertyCounts,
      arrayDepths: summary.arrayDepths,
      objectDepths: summary.objectDepths,
      leafCount: summary.leafCount
   }
};