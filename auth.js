// Toggle password visibility
function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

// Handle signup
document.getElementById("signupForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("signupUsername").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Simple user check
    if(users.some(u => u.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Signup successful! Redirecting to login...");
    window.location.href = "login.html";
});

// Handle login
document.getElementById("loginForm")?.addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if(user) {
        sessionStorage.setItem("userLoggedIn", username);
        window.location.href = "index.html"; // redirect to home/menu page
    } else {
        alert("Invalid username or password!");
    }
});
