$(document).ready(function() {

  $('#login-form-contents').on('submit', function(event) {

    $.ajax({
      data : {
		  
        user : $('#login-username').val(),
		pword : $('#login-password').val()
      
	  },
      type : 'POST',
      url : '/login'
    })
	.done(function(response) {
       
	  $('#login-username').val('');
	  $('#login-password').val('');
	  
	  if (response.login == 'invalid') {
        
		alert('That is not a valid username / password combination. Please try again.');
		
	  } else if (response.login == 'valid') {
          
        $('#popout-container').css('display', 'none');
        $('#login-form-container').css('display', 'none');
        $('#signup-form-container').css('display', 'none');
        $('#login-button').css('display', 'none');
        $('#signup-button').css('display', 'none');
        $('#logout-button').css('display', 'inline-block');
        
	    alert("Your credentials have been confirmed, you will now be logged in.");
		
	  }
	
	});

	event.preventDefault();

  });
});