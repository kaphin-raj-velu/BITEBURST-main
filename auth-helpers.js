document.getElementById("logoutBtn")?.addEventListener("click", () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isUserLoggedIn");
    window.location.href = "login.html"; // redirect to login page
});
