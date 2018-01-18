"use strict";

var primitive = {
  "number": true,
  "string": true,
  "boolean": true,
}

var indexCount = [];
var propertyCount = {};
var arrayDepth = [];
var objectDepth = [];
var leafCount = 0;

function parse(tree){
  if(typeof tree in primitive) {
    throw "parse: expects object or array.";
  }

  for(var i in tree) {
    if(tree[i] === null || typeof tree[i] in primitive) continue;
    if(tree instanceof Array) {
      traverseArray(tree, 1, 0);
      continue;
    } 
    if(tree instanceof Object) {
      traverseObject(tree, 0, 1);
      continue;
    }
    throw "parse: can parse only array or object.";
  }
}

function traverseArray(array, currentArrayDepth, currentObjectDepth){
  for(var i in array) {
    if(array[i] === null || typeof array[i] in primitive) {
      leafCount += 1;
      indexCount[i] += 1;
      arrayDepth[currentArrayDepth] += 1;
      continue;
    }
    if(array[i] instanceof Array) {
      traverseArray(array[i], currentArrayDepth+1, currentObjectDepth);
      continue;
    }
    if(array[i] instanceof Object) {
      traverseObject(array[i], currentArrayDepth, currentObjectDepth+1);
      continue;
    }
    throw "traverseArray: unexpected type in array.";
  }
}

function traverseObject(object, currentArrayDepth, currentObjectDepth){
  for(var i in object) {
    if(object[i] === null || typeof object[i] in primitive) {
      leafCount += 1;
      propertyCount[i] += 1;
      objectDepth[currentObjectDepth] += 1;
      continue; 
    }
    if(object[i] instanceof Array) {
      traverseArray(object[i], currentArrayDepth+1, currentObjectDepth);
      continue;
    }
    if(object[i] instanceof Object) {
      traverseObject(object[i], currentArrayDepth, currentObjectDepth+1);
      continue;
    }
    throw "traverseObject: unexpected type in object.";
  }
}

exports["parse"] =  parse;

