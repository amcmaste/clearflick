$(document).ready(function() {
  
  // AJAX Request
  $.ajax({
    data : {

      imdb : $('#movie-id').text(),
      title : $('#title-text').text()

    },
    type : 'GET',
    url : '/movie'
  })
  // Load Questions and Answers
  .done(function(response) {
    
    let quest = $('#questions-general-outer-container');
    quest.html('');

    for (let i=0; i < response.length; i++) {

      let question = response[i];
			
      quest.append(
        
        `
        <div class="question-specific-outer-container">
          <div class="question-specific-inner-container">
            <div class="question-specific-left-container">
              <div class="question-specific-arrow-container">
                <i class="fa fa-arrow-circle-up qua"></i>
			    <i class="fa fa-arrow-circle-down qda"></i>
              </div>
              <div class="question-specific-block-container">
                <span>Q</span>
              </div>
            </div>
            <div class="question-specific-right-container">
              <div class="question-specific-content-container">
                <span>${question.content}</span>
              </div>
              <div class="question-specific-statistics-container">
                <div class="question-specific-statistics-container-left">
                  <div class="question-specific-user-id">
                    <span>${question.user}</span>
                  </div>
                  <div class="question-specific-post-date">
                    <span>${question.time}</span>
                  </div>
                </div>
                <div class="question-specific-statistics-container-right">
                  <div class="question-specific-top-question">
                    <span id="top-question-${i}"></span>
                  </div>
                  <div class="question-specific-points">
                    <span class="points-container">${question.points}pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="answers-general-outer-container-${i}" class="answers-general-outer-container">
          </div>
            <div class="answer-buttons-outer-container">
              <div class="add-answer-container">
                <button class="add-answer-button">ADD ANSWER</button>
                <div class="add-answer-form-container">
                  <form id="answer-form-${i}" class="add-answer-form">
                    <textarea id="answer-form-contents-${i}" class="form-control answer-form-contents" type="text" placeholder="Add answer..."></textarea>
                    <button id="answer-form-submit-${i} type="submit" class="answer-form-submit">SUBMIT</button>
                  </form>
                </div>
              </div>
              <div class="show-more-answers-container">
                <a class="show-button-light">SHOW MORE ANSWERS</a>
              </div>
            </div>
          </div>
        `
        
      );
      
      $('#top-question-0').text('TOP QUESTION');
        
      let ans = $('#answers-general-outer-container-'+i);
		  
      for (let j=0; j < question.answers.length; j++) {
			
        let answer = question.answers[j];
			  
        ans.append(
        
          `
          <div class="answer-specific-inner-container">
            <div class="answer-specific-left-container">
              <div class="answer-specific-arrow-container">
                <i class="fa fa-arrow-circle-up aua"></i>
                <i class="fa fa-arrow-circle-down ada"></i>
              </div>
              <div class="answer-specific-block-container">
                <span>A</span>
              </div>
            </div>
            <div class="answer-specific-right-container">
              <div class="answer-specific-content-container">
                <span>${answer.content}</span>
              </div>
              <div class="answer-specific-statistics-container">
                <div class="answer-specific-statistics-container-left">
                  <div class="answer-specific-user-id">
                    <span>${answer.user}</span>
                  </div>
                  <div class="answer-specific-post-date">
                    <span>${answer.time}</span>
                  </div>
                </div>
                <div class="answer-specific-statistics-container-right">
                  <div class="answer-specific-top-answer">
                    <span class="top-answer-${j}"></span>
                  </div>
                  <div class="answer-specific-points">
                    <span class="points-container">${answer.points}pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
			
        );
        
      }
      
      $('.top-answer-0').text('TOP ANSWER');
    
    };
    
  })
  // Navigation Button Functionality
  .done(function() {
      
    $('#login-button').click(function() {
      $('#popout-container').css('display', 'flex');
      $('#login-form-container').css('display', 'inline-block');
      $('#signup-form-container').css('display', 'none');
    });
    
    $('#signup-button').click(function() {
      $('#popout-container').css('display', 'flex');
      $('#login-form-container').css('display', 'none');
      $('#signup-form-container').css('display', 'inline-block');
    });
    
    $('#home-button').click(function() {
      $('#popout-container').css('display', 'none');
      $('#login-form-container').css('display', 'none');
      $('#signup-form-container').css('display', 'none');
    });
    
    $('#home-button').click(function() {
      $.ajax({
        type : 'GET',
        url : '/homepage'
        })
        .done(function(response) {
	  
          if (response.redirect) {
            window.location.href = response.redirect;
          }
      
	    })
    });
    
    $('#website-logo').click(function() {
      $.ajax({
        type : 'GET',
        url : '/homepage'
        })
        .done(function(response) {
	  
          if (response.redirect) {
            window.location.href = response.redirect;
          }
      
	    })
    });
    
  })

// Register Functionality
  .done(function() {
      
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
          $('#current-user').html(response);
          
          $('.qua').css('display', 'inline-block');
          $('.qda').css('display', 'inline-block');
          $('.aua').css('display', 'inline-block');
          $('.ada').css('display', 'inline-block');
          $('.add-answer-button').css('display', 'inline-block');
          $('#add-question-button').css('display', 'inline-block');
          
	      alert("Your account has been created and you have been logged in.");
	  	
	    }
	  
	  });

	event.preventDefault();

    });
  })
    
  //Login Functionality
  .done(function() {
      
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
          $('#current-user').html(response.username);
          
          $('.qua').css('display', 'inline-block');
          $('.qda').css('display', 'inline-block');
          $('.aua').css('display', 'inline-block');
          $('.ada').css('display', 'inline-block');
          $('.add-answer-button').css('display', 'inline-block');
          $('#add-question-button').css('display', 'inline-block');
          
	      alert("Your credentials have been confirmed, you will now be logged in.");
	  	
	    }
	  
	  });
      
	  event.preventDefault();
    
    })

  })
  
  //Logout Functionality
  .done(function() {
      
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
          $('#current-user').html('');
          
          $('.qua').css('display', 'none');
          $('.qda').css('display', 'none');
          $('.aua').css('display', 'none');
          $('.ada').css('display', 'none');
          $('.add-answer-button').css('display', 'none');
          $('#add-question-button').css('display', 'none');
	  
	      alert("You have been logged out.");
	  
	  });

	event.preventDefault();

    });
  
  })
  
  // Add Question Button Functionality
  .done(function() {
      
    $('#add-question-button').on('click', function(event) {

      $('.add-answer-form').css('display', 'none');
      $('.add-answer-button').css('display', 'inline-block');
      $('.add-question-form').css('display', 'inline-block');
      $('#add-question-button').css('display', 'none');
  
    });
  
  })
  
  // Add Answer Button Functionality
  .done(function() {
      
    $('.add-answer-button').on('click', function(event) {

      $('.add-answer-form').css('display', 'none');
      $('.add-answer-button').css('display', 'inline-block');
      $(this).css('display', 'none');
      $(this).siblings('.add-answer-form-container').children('.add-answer-form').css('display', 'inline-block');
      $('.add-question-form').css('display', 'none');
      $('#add-question-button').css('display', 'inline-block');
  
    });
  
  })
  
  // Add Question Voting Functionality
  .done(function() {
      
    $('.qua').on('click', function(event) {
	
	      let reference = $(this).parent().parent().parent();

          $.ajax({
            data : {
        
		      user : $('#current-user').text(),
		      movie : $('#title-text').text(),
		      content : reference.children('.question-specific-right-container').children('.question-specific-content-container').children('span').text()
      
	        },
            type : 'POST',
            url : '/upvote-question'
          }).done(function(response) {
	  
	        reference.children('.question-specific-right-container').children('.question-specific-statistics-container').children('.question-specific-statistics-container-right').children('.question-specific-points').children('span').html(response[1] + 'pts');
	  
	        if (response[2] == 'Y') {
		  
	          alert('Your vote has been counted!')
		
	        } else {
		  
	          alert('Sorry, you already voted on this question!')
		
	        }
	  
	      }).fail(function() {
	  
	        alert('Failure!')
    
	      });
        });
  
  })
  
  .done(function() {
      
    $('.qda').on('click', function(event) {
	
	      let reference = $(this).parent().parent().parent();

          $.ajax({
            data : {
        
		      user : $('#current-user').text(),
		      movie : $('#title-text').text(),
		      content : reference.children('.question-specific-right-container').children('.question-specific-content-container').children('span').text()
      
	        },
            type : 'POST',
            url : '/downvote-question'
          }).done(function(response) {
	  
	        reference.children('.question-specific-right-container').children('.question-specific-statistics-container').children('.question-specific-statistics-container-right').children('.question-specific-points').children('span').html(response[1] + 'pts');
	  
	        if (response[2] == 'Y') {
		  
	          alert('Your vote has been counted!')
		
	        } else {
		  
	          alert('Sorry, you already voted on this question!')
		
	        }
	  
	      }).fail(function() {
	  
	        alert('Failure!')
    
	      });
        });
  
  })
  
  .done(function() {
      
    $('.aua').on('click', function(event) {
	
	      let reference = $(this).parent().parent().parent();

          $.ajax({
            data : {
        
		      user : $('#current-user').text(),
		      movie : $('#title-text').text(),
			  quest: reference.parent().siblings('.question-specific-inner-container').children('.question-specific-right-container').children('.question-specific-content-container').children('span').text(),
			  ans : reference.children('.answer-specific-right-container').children('.answer-specific-content-container').children('span').text()
      
	        },
            type : 'POST',
            url : '/upvote-answer'
          }).done(function(response) {
	  
	        reference.children('.answer-specific-right-container').children('.answer-specific-statistics-container').children('.answer-specific-statistics-container-right').children('.answer-specific-points').html(response[1] + 'pts');
	  
	        if (response[2] == 'Y') {
		  
	          alert('Your vote has been counted!')
		
	        } else {
		  
	          alert('Sorry, you already voted on this answer!')
		
	        }
	  
	      }).fail(function() {
	  
	        alert('Failure!')
    
	      });
        });
    
  })
  
  .done(function() {
      
    $('.ada').on('click', function(event) {
	
	      let reference = $(this).parent().parent().parent();

          $.ajax({
            data : {
        
		      user : $('#current-user').text(),
		      movie : $('#title-text').text(),
			  quest: reference.parent().siblings('.question-specific-inner-container').children('.question-specific-right-container').children('.question-specific-content-container').children('span').text(),
			  ans : reference.children('.answer-specific-right-container').children('.answer-specific-content-container').children('span').text()
      
	        },
            type : 'POST',
            url : '/downvote-answer'
          }).done(function(response) {
	  
	        reference.children('.answer-specific-right-container').children('.answer-specific-statistics-container').children('.answer-specific-statistics-container-right').children('.answer-specific-points').html(response[1] + 'pts');
	  
	        if (response[2] == 'Y') {
		  
	          alert('Your vote has been counted!')
		
	        } else {
		  
	          alert('Sorry, you already voted on this answer!')
		
	        }
	  
	      }).fail(function() {
	  
	        alert('Failure!')
    
	      });
        });
    
  })
  
  // Add Question Functionality
  .done(function() {
      
    $('#question-form-1').on('submit', function(event) {
	
      let user = $('#current-user').text();
	  let movie = $('#title-text').text();
	  let question = $('#question-form-contents-1').val();
      
      if (user == '') {
        
        alert('Please login to add a question!');
      
      } else {
	  
	    $.ajax({
          data : {
	    	  
            user : user,
	    	movie : movie,
	    	question : question
          
	      },
          type : 'GET',
          url : '/add-question'
        })
        
        // START PAGE RELOAD
        .done(function(){
          $.ajax({
            data : {
      
              movie : $('#title-text').text()
      
            },
            type : 'POST',
            url : '/search'
          })
          .done(function(response) {
	  
            if (response.redirect) {
              window.location.href = response.redirect;
            }
      
	      })
        })
        // END PAGE RELOAD
        
      }
      
      event.preventDefault();
  
    });
  
  })

  // Add Answer Functionality
  .done(function() {
      
    $('.add-answer-form').on('submit', function(event) {
	
      let user = $('#current-user').text();
	  let movie = $('#title-text').text();
	  let question = $(this).parent().parent().parent().siblings('.question-specific-inner-container').children('.question-specific-right-container').children('.question-specific-content-container').children('span').text();
	  let answer = $(this).children('.answer-form-contents').val();
      
      if (user == '') {
        
        alert('Please login to add an answer!');
      
      } else {
	  
	    $.ajax({
          data : {
	    	  
            user : user,
	    	movie : movie,
	    	question : question,
	    	answer : answer
          
	      },
          type : 'GET',
          url : '/add-answer'
        })
        
        // START PAGE RELOAD
        .done(function(){
          $.ajax({
            data : {
      
              movie : $('#title-text').text()
      
            },
            type : 'POST',
            url : '/search'
          })
          .done(function(response) {
	  
            if (response.redirect) {
              window.location.href = response.redirect;
            }
      
	      })
        })
        // END PAGE RELOAD
      
      }
      
      event.preventDefault();
        
    })
  
  })
  
  .done(function() {
    // Check Login Status
    $.ajax({
          
      type : 'POST',
      url : '/check'
      
    })
    .done(function(response) {
          
      let currentuser = $('#current-user');
          
      currentuser.html(response.user);
        
      if (response.user) {
        $('#login-button').css('display', 'none');
        $('#signup-button').css('display', 'none');
        $('#logout-button').css('display', 'inline-block');
        
        $('.qua').css('display', 'inline-block');
        $('.qda').css('display', 'inline-block');
        $('.aua').css('display', 'inline-block');
        $('.ada').css('display', 'inline-block');
        $('.add-answer-button').css('display', 'inline-block');
        $('#add-question-button').css('display', 'inline-block');
            
      } else {
        $('#login-button').css('display', 'inline-block');
        $('#signup-button').css('display', 'inline-block');
        $('#logout-button').css('display', 'none');
        $('#current-user').html('');
        
        $('.qua').css('display', 'none');
        $('.qda').css('display', 'none');
        $('.aua').css('display', 'none');
        $('.ada').css('display', 'none');
        $('.add-answer-button').css('display', 'none');
        $('#add-question-button').css('display', 'none');
      }
      
    })
  
  })
 
});