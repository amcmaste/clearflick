$(document).ready(function() {

  $('#logout-button').on('click', function(event) {

    $.ajax({
      data : {
		  
        user : 'logout'
      
	  },
      type : 'POST',
      url : '/logout'
    })
	.done(function(response) {
        
        $('#popout-container').css('display', 'none');
        $('#login-form-container').css('display', 'none');
        $('#signup-form-container').css('display', 'none');
        $('#login-button').css('display', 'inline-block');
        $('#signup-button').css('display', 'inline-block');
        $('#logout-button').css('display', 'none');
	
	    alert("You have been logged out.");
	
	});

	event.preventDefault();

  });
});