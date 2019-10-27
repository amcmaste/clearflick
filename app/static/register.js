$(document).ready(function() {

  $('#signup-form-contents').on('submit', function(event) {

    $.ajax({
      data : {
        username : $('#signup-username').val(),
        email : $('#email').val(),
        pword : $('#signup-password').val()
      },
      type : 'POST',
      url : '/register'
    })
	.done(function(response) {

	  $('#signup-username').val('');
	  $('#email').val('');
	  $('#signup-password').val('');
	  $('#verify').val('');
	  
	  if (response == 'exists') {
        
		alert('Username or email already exists, please choose another.');
		
	  } else {
        
        $('#popout-container').css('display', 'none');
        $('#login-form-container').css('display', 'none');
        $('#signup-form-container').css('display', 'none');
        $('#login-button').css('display', 'none');
        $('#signup-button').css('display', 'none');
        $('#logout-button').css('display', 'inline-block');
        
	    alert("Your account has been created and you have been logged in.");
		
	  }
	
	});

	event.preventDefault();

  });
});