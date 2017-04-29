var path = require('path');
var fData = require('../data/friends.js');
var bodyParser = require("body-parser");

module.exports = function(app) {

    //Through this path, fData in JSON format (the API) will be viewed.
    app.get('/api/friends', function(req, res) {

        res.json(fData);
    });

    app.post('/api/friends', function(req, res) {
        console.log(req.body);

        var sArray = [];
        var fLength = fData[0].scores.length;

        //For loops that will go through each friend and calculating their results. 
        for (var i = 0; i < fData.length; i++) {

            var matchArray = [];

            for (var j = 0; j < fLength; j++) {

                
                //Used to compare the scores between the user and their potential friends.
                var diff = Math.abs(req.body.scores[j] - fData[i].scores[j]);
                matchArray.push(diff);
            }

            //The total contents in the matchArray to get a compatibility score for the user 
             
            var cTotal = matchArray.reduce((a, b) => a + b, 0);

            //This pushes the score for each potential match into sArray         
            sArray.push(cTotal);
        }
        //This will discover the smallest number in an array - the most compatible match for the user.
        function arrayMin(array) {
            return array.reduce(function(a, b) {
                return Math.min(a, b);
            });
        }
        //If there are multiple partners tied for most compatible match, all indexes of that lowest number will be given.
        function getAllIndexes(arr, val) {
            var indexes = [],
                i = -1;
            while ((i = arr.indexOf(val, i + 1)) != -1) {
                indexes.push(i);
            }
            return indexes;
        }
      
        var smallestDiff = arrayMin(sArray);
        var matchIndexes = getAllIndexes(sArray, smallestDiff);
        var mArray = [];

        //A for loop that pushes the most compatible partners into an array.
        for (var i = 0; i < matchIndexes.length; i++) {
            mArray.push(fData[matchIndexes[i]]);
        }
        //Allows the array to be pushed as a data response to the front end.
        res.json(mArray);

        //Finally, add newFriend to the fData API
        fData.push(req.body);

    });


}
