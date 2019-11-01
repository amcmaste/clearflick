$(document).ready(function() {

  $.ajax({

    type : 'POST',
    url : '/top'
    
  })
  .done(function(response) {
    
    let tmsc = $('#top-movies-specific-container');
    tmsc.html('');
    
    for (let i=0; i < response.length; i++) {
        
      let data = response[i];
      
      let item = `<a id="movie-box-${i}" class="movie-box" href="/?movie=${data.title}"><img class="interior-image" src="${data.poster}" height="275" width="180"/></a>`
      
      tmsc.append(item);
      
    };
  
  })
 
});