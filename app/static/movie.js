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
                <i class="fa fa-arrow-circle-up"></i>
			    <i class="fa fa-arrow-circle-down"></i>
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
                    <span>INSERT USER</span>
                  </div>
                  <div class="question-specific-post-date">
                    <span>INSERT DATE</span>
                  </div>
                </div>
                <div class="question-specific-statistics-container-right">
                  <div class="question-specific-top-question">
                    <span>INSERT TOP</span>
                  </div>
                  <div class="question-specific-points">
                    <span>${question.points}pts</span>
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
        
      let ans = $('#answers-general-outer-container-'+i);
		  
      for (let j=0; j < question.answers.length; j++) {
			
        let answer = question.answers[j];
			  
        ans.append(
        
          `
          <div class="answer-specific-inner-container">
            <div class="answer-specific-left-container">
              <div class="answer-specific-arrow-container">
                <i class="fa fa-arrow-circle-up"></i>
                <i class="fa fa-arrow-circle-down"></i>
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
                    <span>INSERT USER</span>
                  </div>
                  <div class="answer-specific-post-date">
                    <span>INSERT DATE</span>
                  </div>
                </div>
                <div class="answer-specific-statistics-container-right">
                  <div class="answer-specific-top-answer">
                    <span>INSERT TOP</span>
                  </div>
                  <div class="answer-specific-points">
                    <span>${answer.points}pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
			
        );			
      }
    
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
	  
	      alert("You have been logged out.");
	  
	  });

	event.preventDefault();

    });
  
  })
  
  // Add Question Functionality
  .done(function() {
      
    $('#add-question-button').on('click', function(event) {

      $(this).after($('#add-question-form-container'));
	  $('#add-question-form-container').removeClass('d-none');
	  $(this).addClass('d-none');
  
    });
  
  })
  
  // Add Answer Functionality
  .done(function() {
      
    $('.add-answer-button').on('click', function(event) {

      $(this).siblings('.add-answer-form-container').css('display', 'inline-block');
      $(this).siblings('.add-answer-form-container').children('.add-answer-form').css('display', 'inline-block');
	  $(this).addClass('d-none');
  
    });
  
  })

});