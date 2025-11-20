// script.js

document.addEventListener("DOMContentLoaded", function () {
  // ============================
  // 1. Menu actif selon la page
  // ============================
  const currentPage = window.location.pathname.split("/").pop();
  const menuLinks = document.querySelectorAll("nav ul li a");

  menuLinks.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // ============================
  // 2. Animation hover services
  // ============================
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "scale(1.05)";
      card.style.transition = "all 0.3s ease";
      card.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "scale(1)";
      card.style.boxShadow = "0 0 10px rgba(0,0,0,0.1)";
    });
  });

  // ============================
  // 3. Testimonials slideshow
  // ============================
  const testimonials = document.querySelectorAll(".testimonial-card");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((t, i) => {
      t.style.display = i === index ? "block" : "none";
    });
  }

  if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000); // change toutes les 5 secondes
  }

  // ============================
  // 4. Scroll smooth pour les liens
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ============================
  // 5. Formulaire contact validation
  // ============================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      let errors = [];

      if (name.length < 2) errors.push("Nom trop court");
      if (!email.includes("@") || !email.includes(".")) errors.push("Email invalide");
      if (message.length < 10) errors.push("Message trop court");

      if (errors.length > 0) {
        e.preventDefault();
        alert("Erreur :\n" + errors.join("\n"));
      }
    });
  }

  // ============================
  // 6. Bouton Retour en haut
  // ============================
  const backTop = document.createElement("button");
  backTop.textContent = "↑";
  backTop.id = "back-to-top";
  Object.assign(backTop.style, {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    padding: "10px 15px",
    fontSize: "20px",
    display: "none",
    backgroundColor: "#333",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    zIndex: "1000",
  });
  document.body.appendChild(backTop);

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backTop.style.display = "block";
    } else {
      backTop.style.display = "none";
    }
  });
});
