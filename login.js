document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Hardcoded admin credentials
  const adminUser = "admin";
  const adminPass = "12345";

  if (username === adminUser && password === adminPass) {
    // Save login state
    localStorage.setItem("isAdminLoggedIn", "true");
    window.location.href = "dashboard.html"; // redirect
  } else {
    document.getElementById("errorMsg").innerText = "❌ Invalid username or password!";
  }
});
