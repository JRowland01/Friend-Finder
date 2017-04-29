$(document).ready(function() {
    $("#submit").on("click",
        function() {
            console.log("click");

         function validateForm() {
		  var isValid = true;
		  $('.form-control').each(function() {
		    if ( $(this).val() === '' )
		        isValid = false;
		  });

		  $('.chosen-select').each(function() {

		  	if( $(this).val() === "")
		  		isValid = false
		  })
		  return isValid;
		}


            if (validateForm() == true) {
                var myData = {
                    name: $("#name").val(),
                    photo: $("#photo").val(),
                    scores: [$("#q1").val(), $("#q2").val(), $("#q3").val(), $("#q4").val(), $("#q5").val(), $("#q6").val(),
                        $("#q7").val(), $("#q8").val(), $("#q9").val(), $("#q10").val()
                    ]
                };
                // Grab the URL of the website
                var currentURL = window.location.origin;

                // AJAX post the data to the friends API. 
                $.post(currentURL + "/api/friends", myData, function(data) {
                	console.log(data);
                	
                // Grab the result from the AJAX post so that the best match's name and photo are displayed.
	    		$("#matchName").text(data[0].name);
	    		$("#matchImg").attr("src", data[0].photo);

		    	// Show the modal with the best match 
		    	$("#resultsModal").modal('toggle');

	    	});
		
            } else {
                alert("Please fill in all the fields.");
            }
        });



});
