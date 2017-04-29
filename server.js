var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Node is informed that an Express service is being created.
var app = express(); 

app.use(express.static(__dirname + '/public'));
var PORT = process.env.PORT || 9040;

// This makes it more simple for the server to interpret data sent to it.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static(__dirname + '/app/public'));

// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// The below code effectively "starts" our server
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
