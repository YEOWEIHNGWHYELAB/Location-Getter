$(document).ready(function() {
  $('#register-form').submit(function(e) {
    e.preventDefault();
    
    var username = $('#username').val();
    var password = $('#password').val();
    var confirmPassword = $('#confirm-password').val();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/register',
      data: {
        username: username,
        password: password
      },
      success: function(data) {
        alert(data.message);
        window.location.href = '/auth';
      },
      error: function(xhr, textStatus, errorThrown) {
        alert(xhr.responseText);
      }
    });
  });
});
