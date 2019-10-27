$(document).ready(function() {
  
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
  
});