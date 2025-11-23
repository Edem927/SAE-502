// ===========================================
//  SCRIPT PROFESSIONNEL - SITE CORPORATE
//  ✨ Version optimisée, animations fluides,
//    code propre ES6+, zéro inline CSS.
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // 1. Gestion dynamique du menu actif
  // =====================================================
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // =====================================================
  // 2. Apparitions douces des sections (IntersectionObserver)
  // =====================================================
  const revealElements = document.querySelectorAll(".reveal");

  const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealOnScroll.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  revealElements.forEach(el => revealOnScroll.observe(el));

  // =====================================================
  // 3. Animation des cartes de services
  // =====================================================
  document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("mouseenter", () => card.classList.add("hover"));
    card.addEventListener("mouseleave", () => card.classList.remove("hover"));
  });

  // =====================================================
  // 4. Témoignages : slider automatique + fade
  // =====================================================
  const testimonials = document.querySelectorAll(".testimonial-card");
  let index = 0;

  if (testimonials.length > 0) {
    testimonials.forEach(t => t.style.display = "none");
    testimonials[0].style.display = "block";

    setInterval(() => {
      testimonials[index].style.opacity = 0;

      setTimeout(() => {
        testimonials[index].style.display = "none";
        index = (index + 1) % testimonials.length;
        testimonials[index].style.display = "block";
        testimonials[index].style.opacity = 1;
      }, 500);

    }, 5000);
  }

  // =====================================================
  // 5. Smooth scroll modernisé
  // =====================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // =====================================================
  // 6. Validation formulaire (pro & UX-friendly)
  // =====================================================
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", e => {
      const name = form.querySelector("#name").value.trim();
      const email = form.querySelector("#email").value.trim();
      const message = form.querySelector("#message").value.trim();

      const errors = [];

      if (name.length < 2) errors.push("Votre nom est trop court.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        errors.push("Votre email est invalide.");
      if (message.length < 10)
        errors.push("Votre message doit contenir au moins 10 caractères.");

      if (errors.length > 0) {
        e.preventDefault();
        showToast(errors.join("<br>"));
      }
    });
  }

  // =====================================================
  // 7. Notification professionnelle (toast)
  // =====================================================
  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 50);
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // =====================================================
  // 8. Bouton "Retour en haut"
  // =====================================================
  const backTop = document.createElement("button");
  backTop.id = "back-to-top";
  backTop.textContent = "↑";
  document.body.appendChild(backTop);

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener("scroll", () => {
    backTop.classList.toggle("visible", window.scrollY > 350);
  });
});
