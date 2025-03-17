document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const registerBox = document.getElementById("registerBox");
    const registerLink = document.getElementById("registerLink");
    const loginLink = document.getElementById("loginLink");

    // Switch to Register
    registerLink.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".form-box").classList.add("hidden");
        registerBox.classList.remove("hidden");
    });

    // Switch to Login
    loginLink.addEventListener("click", (e) => {
        e.preventDefault();
        registerBox.classList.add("hidden");
        document.querySelector(".form-box").classList.remove("hidden");
    });

    // Login Simulation
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Login Successful! Redirecting...");
        window.location.href = "/dashboard.html"; // Redirect after login
    });

    // Register Simulation
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Registration Successful! You can now log in.");
        registerBox.classList.add("hidden");
        document.querySelector(".form-box").classList.remove("hidden");
    });
});
