document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((btn) => {
    btn.addEventListener("touchstart", () => {
      btn.classList.add("is-pressed");
    }, { passive: true });

    btn.addEventListener("touchend", () => {
      setTimeout(() => btn.classList.remove("is-pressed"), 120);
    });
  });

  const allImages = document.querySelectorAll("img");
  allImages.forEach((img) => {
    img.addEventListener("error", () => {
      img.src = "https://placehold.co";
    });
  });
});
