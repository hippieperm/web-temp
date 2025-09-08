// Animation Module
export class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverAnimations();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      ".section-header, .about-content, .course-card, .facility-card, .notice-item"
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    this.observers.set("scroll", observer);
  }

  setupHoverAnimations() {
    // Service items hover effects
    const serviceItems = document.querySelectorAll(".service-item");
    serviceItems.forEach((item) => {
      item.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px) scale(1.02)";
      });

      item.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });

    // Course cards hover effects
    const courseCards = document.querySelectorAll(".course-card");
    courseCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
        this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      });
    });

    // Facility cards hover effects
    const facilityCards = document.querySelectorAll(".facility-card");
    facilityCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.1)";
      });
    });
  }

  // Animate element with specific animation
  animateElement(element, animationClass, duration = 600) {
    element.classList.add(animationClass);

    setTimeout(() => {
      element.classList.remove(animationClass);
    }, duration);
  }

  // Stagger animation for multiple elements
  staggerAnimation(elements, animationClass, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        this.animateElement(element, animationClass);
      }, index * delay);
    });
  }

  // Parallax effect
  setupParallax() {
    const parallaxElements = document.querySelectorAll("[data-parallax]");

    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      parallaxElements.forEach((element) => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
  }

  destroy() {
    // Clean up observers
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}
