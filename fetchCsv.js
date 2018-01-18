var http = require("https");
var parse = require("csv-parse/lib/sync");

var urlBase = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFAs12jcTQbXPN3pkZ0-qDV1iAmQ8a438nO8H2mtNri47NI_znqcX_UaxnhjDMUxvi38cq8b9etStk/pub?output=csv&single=true&gid=";

function getContent(gid) {
   return new Promise(function(resolve, reject) {
      var request = http.get(urlBase + gid, function(response) {
         var csv = "";
         response.setEncoding('utf8');
         response.on('data', function(text) {
            csv += text;
         });

         response.on('end', function() {
            resolve(csv);
         });
      });

      request.on("error", function(error) {
         reject(error);
      });
   });
} //getContent

getContent(0).then(function(x) {
   console.log(x);
});