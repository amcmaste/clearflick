$(document).ready(function() {

  $('#search-field').keypress(function(event) {
    if(event.which == 13) {
 
      // Start AJAX request
      $.ajax({
        data : {
      
          movie : $('#search-field').val()
      
        },
        type : 'POST',
        url : '/search'
      })
      .done(function(response) {
	  
        if (response.redirect) {
          window.location.href = response.redirect;
        }
      
	  })
    
    event.preventDefault();
    
    }
    
  });
  
  $('#search-field-lower').keypress(function(event) {
    if(event.which == 13) {
 
      // Start AJAX request
      $.ajax({
        data : {
      
          movie : $('#search-field-lower').val()
      
        },
        type : 'POST',
        url : '/search'
      })
      .done(function(response) {
	  
        if (response.redirect) {
          window.location.href = response.redirect;
        }
      
	  })
    
    event.preventDefault();
    
    }
    
  });

});