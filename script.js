// Smooth interactions for Harini's portfolio

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Rotating role text
const typingText = document.getElementById("typingText");
const roles = ["Full Stack Developer", "Web Developer", "Python Developer"];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
  const currentRole = roles[roleIndex];
  typingText.textContent = currentRole.substring(0, charIndex);

  if (!deleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeRole, 85);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 42);
  } else {
    deleting = !deleting;
    if (!deleting) roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, deleting ? 1300 : 250);
  }
}
typeRole();

// Reveal sections as they enter the screen
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Close mobile menu after selecting a navigation link
const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navMenu = document.getElementById("mainNav");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});

// Highlight active navigation link
const sections = document.querySelectorAll("main section[id]");
window.addEventListener("scroll", () => {
  let currentSection = "home";
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
  });

  // Back to top button
  document.getElementById("backToTop").classList.toggle("show", window.scrollY > 450);
});

// Back to top action
document.getElementById("backToTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
