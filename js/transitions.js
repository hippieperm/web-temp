// Page Transition Manager
export class TransitionManager {
  constructor() {
    this.transitionElement = null;
    this.init();
  }

  init() {
    this.createTransitionElement();
    this.setupIntersectionObserver();
  }

  createTransitionElement() {
    this.transitionElement = document.createElement("div");
    this.transitionElement.className = "page-transition";
    this.transitionElement.innerHTML = `
      <div>
        <div class="loading-spinner"></div>
        <div class="loading-text">페이지를 불러오는 중...</div>
      </div>
    `;
    document.body.appendChild(this.transitionElement);
  }

  showTransition(duration = 1000) {
    return new Promise((resolve) => {
      this.transitionElement.classList.add("active");
      setTimeout(() => {
        this.transitionElement.classList.remove("active");
        resolve();
      }, duration);
    });
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    const animatedElements = document.querySelectorAll(
      ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
    );

    animatedElements.forEach((el) => observer.observe(el));
  }

  // Add animation classes to elements
  addAnimationClasses() {
    // Add fade-in to sections
    const sections = document.querySelectorAll("section");
    sections.forEach((section, index) => {
      section.classList.add("fade-in");
      section.style.animationDelay = `${index * 0.2}s`;
    });

    // Add slide-in-left to about text
    const aboutText = document.querySelector(".about-text");
    if (aboutText) {
      aboutText.classList.add("slide-in-left");
    }

    // Add slide-in-right to about image
    const aboutImage = document.querySelector(".about-image");
    if (aboutImage) {
      aboutImage.classList.add("slide-in-right");
    }

    // Add scale-in to cards
    const cards = document.querySelectorAll(".course-card, .facility-card");
    cards.forEach((card, index) => {
      card.classList.add("scale-in");
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add card-hover class to interactive cards
    const interactiveCards = document.querySelectorAll(
      ".service-item, .course-card, .facility-card, .notice-item"
    );
    interactiveCards.forEach((card) => {
      card.classList.add("card-hover");
    });
  }

  // Enhanced click feedback
  addClickFeedback(element) {
    element.addEventListener("click", (e) => {
      // Add bounce animation
      element.classList.add("bounce");

      // Remove bounce class after animation
      setTimeout(() => {
        element.classList.remove("bounce");
      }, 600);

      // Add ripple effect if not already present
      if (!element.querySelector(".ripple")) {
        this.createRipple(e, element);
      }
    });
  }

  createRipple(event, element) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  // Smooth scroll to element with transition
  async scrollToElement(element, offset = 0) {
    await this.showTransition(500);

    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });

    await this.showTransition(500);
  }

  // Page load animation
  async animatePageLoad() {
    // Add loading class to body
    document.body.classList.add("loading");

    // Show transition
    await this.showTransition(800);

    // Add animation classes
    this.addAnimationClasses();

    // Remove loading class
    document.body.classList.remove("loading");
  }

  // Error animation
  showError(element) {
    element.classList.add("shake");
    setTimeout(() => {
      element.classList.remove("shake");
    }, 500);
  }

  // Success animation
  showSuccess(element) {
    element.classList.add("bounce");
    setTimeout(() => {
      element.classList.remove("bounce");
    }, 600);
  }

  // Cleanup
  destroy() {
    if (this.transitionElement) {
      this.transitionElement.remove();
    }
  }
}
