// Navigation
class VintageNavigation {
  constructor() {
    this.navLinks = document.getElementById("navLinks");
    this.menuToggle = document.getElementById("menuToggle");
    this.navItems = document.querySelectorAll(".nav-link");
    this.body = document.body;
    this.menuOpen = false;
    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.menuToggle) {
      this.menuToggle.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleMenu();
      });
    }

    // Close mobile menu when clicking a link
    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          this.closeMenu();
        }
        this.setActiveLink(item);
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        this.menuOpen &&
        this.navLinks &&
        !this.navLinks.contains(e.target) &&
        this.menuToggle &&
        !this.menuToggle.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.menuOpen) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && this.menuOpen) {
        this.closeMenu();
      }
    });

    // Set active link
    this.setActiveLinkBasedOnPage();
  }

  toggleMenu() {
    if (!this.navLinks || !this.menuToggle) return;

    if (this.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.menuOpen = true;

    // Add classes
    this.navLinks.classList.add("active");
    this.menuToggle.classList.add("active");

    this.body.style.overflow = "hidden";
  }

  closeMenu() {
    if (!this.navLinks || !this.menuToggle) return;

    this.menuOpen = false;

    // Remove classes
    this.navLinks.classList.remove("active");
    this.menuToggle.classList.remove("active");

    // Restore scroll
    this.body.style.overflow = "";
  }

  setActiveLink(clickedItem) {
    this.navItems.forEach((item) => {
      item.classList.remove("active");
    });
    clickedItem.classList.add("active");

    const link = clickedItem.getAttribute("href");
    if (link && !link.startsWith("#")) {
      localStorage.setItem("activePage", link);
    }
  }

  setActiveLinkBasedOnPage() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    this.navItems.forEach((item) => {
      const link = item.getAttribute("href");
      if (link === currentPage) {
        item.classList.add("active");
      }
    });
  }
}
// ===== LOVE LETTERS  =====
function initLoveLetters() {
  const openLetterBtn = document.getElementById("openLetterBtn");
  const letterModal = document.getElementById("letterModalOverlay");
  const closeLetterBtn = document.getElementById("closeLetterModal");
  const categoryTabs = document.querySelectorAll(".category-tab");
  const letterContents = document.querySelectorAll(".letter-content");
  const categoryItems = document.querySelectorAll(".category-item");

  if (!letterModal) return;

  function openModal() {
    // Store current scroll position
    const scrollY = window.scrollY;

    // Lock body scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    // Show modal
    letterModal.classList.add("active");

    // Reset modal scroll position to top
    const modalContainer = letterModal.querySelector(".letter-modal-container");
    if (modalContainer) {
      modalContainer.scrollTop = 0;
    }
  }

  function closeModal() {
    // Get the scroll position
    const scrollY = document.body.style.top;

    // Unlock body scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    // Restore scroll position
    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    // Hide modal
    letterModal.classList.remove("active");
  }

  // Open modal
  if (openLetterBtn) {
    openLetterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Close modal
  if (closeLetterBtn) {
    closeLetterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    });
  }

  // Close when clicking outside (on the overlay)
  letterModal.addEventListener("click", function (e) {
    if (e.target === letterModal) {
      closeModal();
    }
  });

  // Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && letterModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Category tabs
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      const category = this.dataset.category;

      categoryTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");

      letterContents.forEach((content) => {
        content.classList.remove("active");
      });

      const targetLetter = document.getElementById(`${category}-letter`);
      if (targetLetter) targetLetter.classList.add("active");

      // Scroll modal to top when changing category
      const modalContainer = letterModal.querySelector(
        ".letter-modal-container",
      );
      if (modalContainer) {
        modalContainer.scrollTop = 0;
      }
    });
  });

  // Quick category selection from main page
  categoryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const category = this.dataset.category;
      openModal();

      setTimeout(() => {
        categoryTabs.forEach((tab) => {
          tab.classList.remove("active");
          if (tab.dataset.category === category) {
            tab.classList.add("active");
          }
        });

        letterContents.forEach((content) => {
          content.classList.remove("active");
        });

        const targetLetter = document.getElementById(`${category}-letter`);
        if (targetLetter) targetLetter.classList.add("active");

        // Scroll modal to top
        const modalContainer = letterModal.querySelector(
          ".letter-modal-container",
        );
        if (modalContainer) {
          modalContainer.scrollTop = 0;
        }
      }, 100);
    });
  });
}
// ===== VIRTUAL GIFT BOX =====
function initGiftBox() {
  const openGiftBtn = document.getElementById("openGiftBoxBtn");
  const giftModal = document.getElementById("giftBoxModalOverlay");
  const closeGiftBtn = document.getElementById("closeGiftBoxModal");
  const giftBox = document.getElementById("giftBox");
  const chooseSection = document.getElementById("chooseGiftSection");

  if (!giftModal || !giftBox) return;

  const familyGift = document.getElementById("familyGift");
  const partnerGift = document.getElementById("partnerGift");
  const friendGift = document.getElementById("friendGift");
  const backFamily = document.getElementById("backFromFamily");
  const backPartner = document.getElementById("backFromPartner");
  const backFriend = document.getElementById("backFromFriend");
  const chooseFamily = document.getElementById("chooseFamily");
  const choosePartner = document.getElementById("choosePartner");
  const chooseFriend = document.getElementById("chooseFriend");

  function openModal() {
    // Store current scroll position
    const scrollY = window.scrollY;

    // Lock body scroll
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    // Show modal
    giftModal.classList.add("active");

    // Reset modal scroll position to top
    const modalContainer = giftModal.querySelector(".giftbox-modal-container");
    if (modalContainer) {
      modalContainer.scrollTop = 0;
    }

    // Reset gift box
    resetGiftBox();
  }

  function closeModal() {
    // Get the scroll position
    const scrollY = document.body.style.top;

    // Unlock body scroll
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";

    // Restore scroll position
    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    // Hide modal
    giftModal.classList.remove("active");
  }

  // Open modal
  if (openGiftBtn) {
    openGiftBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  }

  // Close modal
  if (closeGiftBtn) {
    closeGiftBtn.addEventListener("click", function (e) {
      e.preventDefault();
      closeModal();
    });
  }

  // Click outside to close
  giftModal.addEventListener("click", function (e) {
    if (e.target === giftModal) {
      closeModal();
    }
  });

  // Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && giftModal.classList.contains("active")) {
      closeModal();
    }
  });

  // Open gift box
  giftBox.addEventListener("click", function () {
    if (this.classList.contains("opened")) return;

    this.classList.remove("closed");
    this.classList.add("opened");

    const instruction = document.querySelector(".gift-instruction");
    if (instruction) {
      instruction.style.opacity = "0";
      instruction.style.pointerEvents = "none";
    }

    setTimeout(() => {
      if (chooseSection) {
        chooseSection.style.display = "block";
      }
    }, 500);
  });

  function showGift(type) {
    if (chooseSection) chooseSection.style.display = "none";

    if (familyGift) familyGift.style.display = "none";
    if (partnerGift) partnerGift.style.display = "none";
    if (friendGift) friendGift.style.display = "none";

    setTimeout(() => {
      if (type === "family" && familyGift) {
        familyGift.style.display = "block";
        // Scroll modal to top when showing gift
        const modalContainer = giftModal.querySelector(
          ".giftbox-modal-container",
        );
        if (modalContainer) {
          modalContainer.scrollTop = 0;
        }
      }
      if (type === "partner" && partnerGift) {
        partnerGift.style.display = "block";
        const modalContainer = giftModal.querySelector(
          ".giftbox-modal-container",
        );
        if (modalContainer) {
          modalContainer.scrollTop = 0;
        }
      }
      if (type === "friend" && friendGift) {
        friendGift.style.display = "block";
        const modalContainer = giftModal.querySelector(
          ".giftbox-modal-container",
        );
        if (modalContainer) {
          modalContainer.scrollTop = 0;
        }
      }
    }, 300);
  }

  function backToChoose() {
    if (familyGift) familyGift.style.display = "none";
    if (partnerGift) partnerGift.style.display = "none";
    if (friendGift) friendGift.style.display = "none";

    if (chooseSection) {
      chooseSection.style.display = "block";
      // Scroll modal to top when going back
      const modalContainer = giftModal.querySelector(
        ".giftbox-modal-container",
      );
      if (modalContainer) {
        modalContainer.scrollTop = 0;
      }
    }
  }

  function resetGiftBox() {
    giftBox.classList.remove("opened");
    giftBox.classList.add("closed");

    const instruction = document.querySelector(".gift-instruction");
    if (instruction) {
      instruction.style.opacity = "1";
      instruction.style.pointerEvents = "auto";
    }

    if (chooseSection) chooseSection.style.display = "none";
    if (familyGift) familyGift.style.display = "none";
    if (partnerGift) partnerGift.style.display = "none";
    if (friendGift) friendGift.style.display = "none";
  }

  if (chooseFamily) {
    chooseFamily.addEventListener("click", () => showGift("family"));
  }
  if (choosePartner) {
    choosePartner.addEventListener("click", () => showGift("partner"));
  }
  if (chooseFriend) {
    chooseFriend.addEventListener("click", () => showGift("friend"));
  }
  if (backFamily) {
    backFamily.addEventListener("click", (e) => {
      e.preventDefault();
      backToChoose();
    });
  }
  if (backPartner) {
    backPartner.addEventListener("click", (e) => {
      e.preventDefault();
      backToChoose();
    });
  }
  if (backFriend) {
    backFriend.addEventListener("click", (e) => {
      e.preventDefault();
      backToChoose();
    });
  }
}
// ===== INITIALIZE =====
document.addEventListener("DOMContentLoaded", () => {
  new VintageNavigation();
  initLoveLetters();
  initGiftBox();

  // Force scrollbar to always be visible
  document.documentElement.style.overflowY = "scroll";
});
