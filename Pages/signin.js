// Show / Hide password
function togglePassword() {
  var passwordField = document.getElementById("password");
  var confirmField = document.getElementById("confirm-password");
  var checkbox = document.getElementById("show-password");

  if (checkbox.checked) {
    passwordField.type = "text";
    confirmField.type = "text";
  } else {
    passwordField.type = "password";
    confirmField.type = "password";
  }
}

// Form validation
var form = document.getElementById("signupForm");
form.addEventListener("submit", function(event) {
  event.preventDefault(); // Stop form from submitting

  var fullname = document.getElementById("fullname").value;
  var email = document.getElementById("user-email").value;
  var phone = document.getElementById("user-phone").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Check password length
  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }
  
  function handleSignIn(event){
  event.preventDefault();
  window.location.href = "DASHBOARD.html"; // THIS WAS MISSING
}

  // Success - any student can sign up
  alert("Account created for: " + fullname + "\nYou can now log in!");
  window.location.href = "LOGIN.html";
});