document.addEventListener("DOMContentLoaded", function() {

    // 1. Check if user is logged in
    const user = localStorage.getItem("forge_user");
    const isLoggedIn = localStorage.getItem("forge_logged_in");
    const welcomeText = document.getElementById("welcomeText");

    if (!isLoggedIn) {
        // Uncomment to force login
        // window.location.href = "LOGIN.html";
        // return;
    }

    if (user && welcomeText) {
        const name = user.split("@")[0];
        welcomeText.textContent = "Welcome back, " + name + "!";
    }

    // 2. Update stats
    const countEl = document.getElementById("countMaterials");
    const uploads = localStorage.getItem("forge_uploads_count") || 0;
    if (countEl) {
        // Animate count
        let count = 0;
        const target = parseInt(uploads);
        const timer = setInterval(() => {
            if (count >= target) {
                clearInterval(timer);
                countEl.textContent = target;
            } else {
                count++;
                countEl.textContent = count;
            }
        }, 100);

        if(target == 0) countEl.textContent = "0";
    }

    // 3. Add Logout button automatically
    const nav = document.querySelector("nav ul");
    if (nav && isLoggedIn) {
        const li = document.createElement("li");
        li.innerHTML = `<a href="#" id="logoutBtn" style="border-color:#ff4444;color:#ff9999;">Logout</a>`;
        nav.appendChild(li);

        document.getElementById("logoutBtn").addEventListener("click", function(e) {
            e.preventDefault();
            if (confirm("Do you want to logout?")) {
                localStorage.removeItem("forge_logged_in");
                // Keep email for next login
                window.location.href = "LOGIN.html";
            }
        });
    }

    // 4. Card click effect
    const cards = document.querySelectorAll(".dashboard-card");
    cards.forEach(card => {
        card.addEventListener("click", function() {
            const link = this.querySelector("a");
            if (link) {
                window.location.href = link.href;
            }
        });
        card.style.cursor = "pointer";
    });

    // 5. Greeting based on time
    const hour = new Date().getHours();
    let greeting = "Good Morning";
    if (hour >= 12 && hour < 18) greeting = "Good Afternoon";
    if (hour >= 18) greeting = "Good Evening";

    if (welcomeText && user) {
        welcomeText.textContent = `${greeting}, ${user.split("@")[0]}!`;
    }

    console.log("FORGE Dashboard Loaded - User:", user);
});