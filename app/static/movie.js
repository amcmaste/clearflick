$(document).ready(function() {
  
  // Start AJAX request
  $.ajax({
    data : {

      imdb : $('#movie-id').text(),
      title : $('#title-text').text()

    },
    type : 'GET',
    url : '/movie'
  })
  .done(function(response) {
    
    // Populate questions and answers
    let quest = $('#questions-general-outer-container');
    quest.html('');
		
    //Start pasted content (A)
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
                <div class="add-answer-form">
                  {{  wtf.quick_form(answer)  }}
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

});