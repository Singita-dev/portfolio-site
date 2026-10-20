// 1. Welcome message changes with time
var heading = document.querySelector("h1");
var originalText = heading.innerText;

var hour = new Date().getHours();
var timeMessage = "";

if (hour < 12) {
  timeMessage = "Good Morning, Tiger!";
} else if (hour < 18) {
  timeMessage = "Good Afternoon, Tiger!";
} else {
  timeMessage = "Good Evening, Tiger!";
}

// Add time greeting above FORGE title
var eyebrow = document.querySelector(".eyebrow");
if (eyebrow) {
  eyebrow.innerText = timeMessage + " | Your student hub";
}

// 2. CTA button glow - ONLY your 4 colors #7ccfff, #ff8c00, #00dfff, #c9ebff
var ctaButton = document.querySelector(".cta");

if (ctaButton) {
  ctaButton.addEventListener("mouseenter", function() {
    this.style.background = "#ff8c00";
    this.style.color = "#c9ebff";
    this.style.boxShadow = "0 0 15px #00dfff";
  });

  ctaButton.addEventListener("mouseleave", function() {
    this.style.background = "#ff8c00";
    this.style.color = "#0a1930";
    this.style.boxShadow = "none";
  });

  ctaButton.addEventListener("click", function(event) {
    // Small animation when clicked
    this.style.transform = "scale(0.95)";
    setTimeout(function() {
      ctaButton.style.transform = "translateY(-3px)";
    }, 150);
  });
}

// 3. Brand click - go to home
var brand = document.querySelector(".brand");
if (brand) {
  brand.style.cursor = "pointer";
  brand.addEventListener("click", function() {
    window.location.href = "HOME.html";
  });
}

// 4. Active nav highlight
var navLinks = document.querySelectorAll("nav a");
var currentPage = window.location.pathname.split("/").pop();

for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].getAttribute("href") == currentPage) {
    navLinks[i].style.background = "#7ccfff";
    navLinks[i].style.borderColor = "#7ccfff";
    navLinks[i].style.color = "#0a1930";
  }
}