document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     CURRENT YEAR
  ===================================== */

  document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });


  /* =====================================
     DARK / LIGHT THEME
  ===================================== */

  const themeButtons = document.querySelectorAll(".theme-toggle");

  const savedTheme = localStorage.getItem("jimoxPortfolioTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }

  function updateThemeButtons() {

    const isDark = document.body.classList.contains("dark");

    themeButtons.forEach(button => {

      button.textContent = isDark ? "☀" : "☾";

      button.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );

    });

  }

  updateThemeButtons();

  themeButtons.forEach(button => {

    button.addEventListener("click", () => {

      document.body.classList.toggle("dark");

      const theme = document.body.classList.contains("dark")
        ? "dark"
        : "light";

      localStorage.setItem("jimoxPortfolioTheme", theme);

      updateThemeButtons();

    });

  });


  /* =====================================
     MOBILE NAVIGATION
  ===================================== */

  const menuButton = document.querySelector(".menu-toggle");

  const sidebar = document.querySelector(".sidebar");

  const overlay = document.querySelector(".sidebar-overlay");

  const navLinks = document.querySelectorAll(".nav-link");


  function openMenu() {

    sidebar.classList.add("open");

    overlay.classList.add("show");

    document.body.classList.add("menu-open");

    menuButton.setAttribute("aria-expanded", "true");

    menuButton.setAttribute("aria-label", "Close navigation");

    menuButton.textContent = "✕";

  }


  function closeMenu() {

    sidebar.classList.remove("open");

    overlay.classList.remove("show");

    document.body.classList.remove("menu-open");

    menuButton.setAttribute("aria-expanded", "false");

    menuButton.setAttribute("aria-label", "Open navigation");

    menuButton.textContent = "☰";

  }


  if (menuButton && sidebar && overlay) {

    menuButton.addEventListener("click", () => {

      const isOpen = sidebar.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }

    });


    overlay.addEventListener("click", closeMenu);


    navLinks.forEach(link => {

      link.addEventListener("click", closeMenu);

    });


    document.addEventListener("keydown", event => {

      if (event.key === "Escape") {
        closeMenu();
      }

    });


    document.addEventListener("click", event => {

      if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        closeMenu();

      }

    });


    window.addEventListener("resize", () => {

      if (window.innerWidth > 1023) {
        closeMenu();
      }

    });

  }


  /* =====================================
     ACTIVE NAVIGATION
  ===================================== */

  const sections = document.querySelectorAll(
    "main section[id]"
  );


  if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            const activeId = entry.target.id;

            navLinks.forEach(link => {

              const isActive =
                link.getAttribute("href") === `#${activeId}`;

              link.classList.toggle("active", isActive);

            });

          }

        });

      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      }
    );


    sections.forEach(section => {

      sectionObserver.observe(section);

    });

  }


  /* =====================================
     SCROLL REVEAL ANIMATIONS
  ===================================== */

  const revealElements = document.querySelectorAll(

    ".section-heading, " +
    ".about-layout, " +
    ".career-objective, " +
    ".skill-card, " +
    ".software-item, " +
    ".timeline-item, " +
    ".experience-card, " +
    ".interest-card, " +
    ".contact-box"

  );


  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  if ("IntersectionObserver" in window && !reduceMotion) {

    const revealObserver = new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.08
      }

    );


    revealElements.forEach(element => {

      element.classList.add("reveal");

      revealObserver.observe(element);

    });

  } else {

    revealElements.forEach(element => {

      element.classList.add("visible");

    });

  }


  /* =====================================
     IMAGE FALLBACK
  ===================================== */

  document.querySelectorAll("img").forEach(image => {

    image.addEventListener("error", () => {

      image.classList.add("image-error");

    });

  });


  /* =====================================
     SMOOTH NAVIGATION
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      if (history.replaceState) {
        history.replaceState(null, "", targetId);
      }

    });

  });


  console.log("Jimox Yamaski Portfolio Loaded Successfully.");

});


