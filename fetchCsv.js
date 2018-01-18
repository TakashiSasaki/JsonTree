var http = require("https");

var url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQFAs12jcTQbXPN3pkZ0-qDV1iAmQ8a438nO8H2mtNri47NI_znqcX_UaxnhjDMUxvi38cq8b9etStk/pub?gid=0&single=true&output=csv";

var req = http.get(url, function(response) {
   var csv = "";
   response.setEncoding('utf8');
   response.on('data', function(text) {
      csv += text;
   });

   response.on('end', function() {
      console.log(csv);
   });
});

req.on("error", function(error) {
   console.log(error);
});