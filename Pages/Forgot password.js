function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById("forgot-email").value;
  const newPass = document.getElementById("new-pass").value;
  const confirmPass = document.getElementById("confirm-pass").value;

  if (newPass !== confirmPass) {
    alert("Passwords do not match!");
    return;
  }

  alert("Password reset successful for " + email);
  window.location.href = "DASHBOARD.html";
}
