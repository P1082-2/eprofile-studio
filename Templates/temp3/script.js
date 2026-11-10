document.addEventListener("DOMContentLoaded", () => {
  const navButtons = document.querySelectorAll(".nav-btn");
  const sections = document.querySelectorAll(".section");
  const allButtons = document.querySelectorAll(".btn, .nav-btn");

  function setActiveButton(id) {
    navButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.getAttribute("href") === `#${id}`) {
        btn.classList.add("active");
      }
    });
  }

  navButtons.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.startsWith("#")) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          setActiveButton(targetId.substring(1));
        }
      }
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";
    const atBottom = window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 10;

    if (atBottom && sections.length > 0) {
      current = sections[sections.length - 1].getAttribute("id");
    } else {
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 80;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });
    }

    if (current) {
      setActiveButton(current);
    }
  });

  allButtons.forEach((btn) => {
    btn.addEventListener("touchstart", () => {
      btn.classList.add("is-pressed");
    }, { passive: true });

    btn.addEventListener("touchend", () => {
      setTimeout(() => btn.classList.remove("is-pressed"), 120);
    });
  });
});
