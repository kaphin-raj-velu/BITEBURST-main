const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("signupUsername").value.trim();
        const email = document.getElementById("signupEmail").value.trim();
        const password = document.getElementById("signupPassword").value.trim();
        const signupMsg = document.getElementById("signupMsg");

        signupMsg.innerText = "";

        if (!username || !email || !password) {
            signupMsg.innerText = "❌ Please fill in all fields.";
            setTimeout(() => signupMsg.innerText = "", 3000);
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                signupMsg.style.color = "green";
                signupMsg.innerText = "✅ Signup successful! Redirecting to login...";
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                signupMsg.innerText = `❌ ${data.message || "Signup failed."}`;
                setTimeout(() => signupMsg.innerText = "", 3000);
            }
        } catch (err) {
            console.error("Error:", err);
            signupMsg.innerText = "❌ Server error. Please check backend.";
            setTimeout(() => signupMsg.innerText = "", 3000);
        }
    });
}
