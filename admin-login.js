// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Handle login form submission
document.getElementById("adminLoginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple admin login check
    if(username === "admin" && password === "admin123") {
        sessionStorage.setItem("adminLoggedIn", "true");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Invalid username or password");
    }
});
