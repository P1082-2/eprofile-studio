document.addEventListener("DOMContentLoaded", () => {
  const previewBoxes = document.querySelectorAll(".preview-box");
  const viewerModal = document.getElementById("viewerModal");
  const viewerFrame = document.getElementById("viewerFrame");
  const viewerTitle = document.getElementById("viewerTitle");
  const closeViewer = document.getElementById("closeViewer");

  const cards = document.querySelectorAll(".card");
  const toastMsg = document.getElementById("toastMsg");
  let toastTimer;

  previewBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      const src = box.getAttribute("data-src");
      const title = box.getAttribute("data-title");
      viewerTitle.textContent = title;
      viewerFrame.src = src;
      viewerModal.classList.remove("hidden");
    });
  });

  function hideViewer() {
    viewerModal.classList.add("hidden");
    viewerFrame.src = "";
  }

  closeViewer.addEventListener("click", hideViewer);

  viewerModal.addEventListener("click", (e) => {
    if (e.target === viewerModal) {
      hideViewer();
    }
  });

  cards.forEach((card) => {
    const basePrice = parseInt(card.getAttribute("data-base-price"), 10);
    const templateCode = card.getAttribute("data-code");
    const priceDisplay = card.querySelector(".price");
    const checkboxes = card.querySelectorAll(".addon-check");
    const selectBtn = card.querySelector(".select-btn");

    function updateTotal() {
      let total = basePrice;
      const selectedAddons = [];

      checkboxes.forEach((cb) => {
        if (cb.checked) {
          total += parseInt(cb.getAttribute("data-price"), 10);
          selectedAddons.push(cb.getAttribute("data-addon"));
        }
      });

      priceDisplay.textContent = `₱${total}`;
      selectBtn.textContent = `Select • ₱${total}`;
      return selectedAddons;
    }

    checkboxes.forEach((cb) => {
      cb.addEventListener("change", updateTotal);
    });

    selectBtn.addEventListener("click", () => {
      const selectedAddons = updateTotal();
      const orderText = selectedAddons.length > 0
        ? `${templateCode}/${selectedAddons.join("+")}`
        : templateCode;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(orderText);
      } else {
        const tempInput = document.createElement("textarea");
        tempInput.value = orderText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      toastMsg.classList.remove("hidden");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toastMsg.classList.add("hidden");
      }, 3000);
    });
  });
});
