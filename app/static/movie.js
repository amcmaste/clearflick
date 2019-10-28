$(document).ready(function() {

  $('#search-field').keypress(function(event) {
    if(event.which == 13) {
 
      // Start first AJAX request
      $.ajax({
        data : {
      
          t : $('#search-field').val()
      
        },
        type : 'GET',
        url : 'https://www.omdbapi.com/?apikey=227f7057&'
      })
      .done(function(response) {
	  
        alert(JSON.stringify(response))
	  
	  })
    
    event.preventDefault();
    
    }
    
  });

});