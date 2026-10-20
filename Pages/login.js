document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const usernameInput = document.getElementById("username") || document.querySelector('input[type="email"]') || document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[type="password"]') || document.getElementById("password");
    
    // Create message box if not exists
    let messageDiv = document.getElementById("loginMessage");
    if (!messageDiv) {
        messageDiv = document.createElement("div");
        messageDiv.id = "loginMessage";
        messageDiv.style.cssText = "margin-top:15px;padding:12px;border-radius:12px;text-align:center;font-size:13px;display:none;";
        form.appendChild(messageDiv);
    }

    // Create show/hide password button
    if (passwordInput) {
        const toggleBtn = document.createElement("span");
        toggleBtn.textContent = "👁️";
        toggleBtn.style.cssText = "position:absolute;right:15px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:16px;";
        
        const wrapper = document.createElement("div");
        wrapper.style.cssText = "position:relative;";
        passwordInput.parentNode.insertBefore(wrapper, passwordInput);
        wrapper.appendChild(passwordInput);
        wrapper.appendChild(toggleBtn);

        toggleBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                toggleBtn.textContent = "🙈";
            } else {
                passwordInput.type = "password";
                toggleBtn.textContent = "👁️";
            }
        });
    }

    function showMessage(text, type) {
        messageDiv.style.display = "block";
        messageDiv.textContent = text;
        if (type === "error") {
            messageDiv.style.background = "rgba(255,0,0,0.15)";
            messageDiv.style.border = "1px solid #ff4444";
            messageDiv.style.color = "#ff9999";
        } else {
            messageDiv.style.background = "rgba(0,255,100,0.15)";
            messageDiv.style.border = "1px solid #00ff88";
            messageDiv.style.color = "#00ff88";
        }
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validation
        if (!username || !password) {
            showMessage("Please fill in your username and password!", "error");
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters!", "error");
            return;
        }

        // Simulate login
        const btn = form.querySelector('button[type="submit"]') || form.querySelector(".btn-login");
        const originalText = btn.textContent;
        btn.textContent = "Logging in...";
        btn.disabled = true;

        setTimeout(() => {
            // For demo: accept any email/password that passes validation
            // You can change this to check real accounts later
            showMessage(`✅ Welcome back! Redirecting to Dashboard...`, "success");

            // Save login state
            localStorage.setItem("forge_user", username);
            localStorage.setItem("forge_logged_in", "true");

            setTimeout(() => {
                window.location.href = "DASHBOARD.html";
            }, 1500);

        }, 1000);
    });

    // Auto-fill if user was remembered
    const savedEmail = localStorage.getItem("forge_user");
    if (savedEmail && usernameInput) {
        usernameInput.value = savedEmail;
    }
});