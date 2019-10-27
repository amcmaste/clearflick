$(document).ready(function() {

  $('#add-question-button').on('click', function(event) {

    $(this).after($('#add-question-form'));
	$('#add-question-form').removeClass('d-none');
	$(this).addClass('d-none');
  
  });
  
});

$(document).ready(function() {

  $('.add-answer-button').on('click', function(event) {

    $(this).siblings('.add-answer-form').css('display', 'inline-block');
	$(this).addClass('d-none');
  
  });
  
});