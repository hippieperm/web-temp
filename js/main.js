// Main Application
import { HeroSlider } from "./hero.js";
import { ModalManager } from "./modals.js";
import { AnimationManager } from "./animations.js";
import { NavigationManager } from "./navigation.js";
import { TransitionManager } from "./transitions.js";
import { utils } from "./utils.js";

class GosungApp {
  constructor() {
    this.modalManager = new ModalManager();
    this.animationManager = new AnimationManager();
    this.navigationManager = new NavigationManager();
    this.transitionManager = new TransitionManager();
    this.heroSlider = null;

    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setupApp());
    } else {
      this.setupApp();
    }
  }

  async setupApp() {
    this.initializeHeroSlider();
    this.bindServiceEvents();
    this.bindCourseEvents();
    this.bindFacilityEvents();
    this.bindNoticeEvents();
    this.bindAuthEvents();
    this.setupRippleEffects();
    this.enhanceInteractions();

    // Animate page load
    await this.transitionManager.animatePageLoad();
  }

  initializeHeroSlider() {
    this.heroSlider = new HeroSlider();
  }

  bindServiceEvents() {
    const serviceItems = document.querySelectorAll(".service-item");
    serviceItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const serviceName = item.querySelector("h3").textContent;
        const section = item.getAttribute("data-section");

        // Add ripple effect
        utils.createRipple(item, e);

        // Navigate to section or show modal
        if (section) {
          const targetSection = document.getElementById(section);
          if (targetSection) {
            this.navigationManager.scrollToSection(targetSection);
          } else {
            this.modalManager.showModal("service", { title: serviceName });
          }
        } else {
          this.modalManager.showModal("service", { title: serviceName });
        }
      });
    });
  }

  bindCourseEvents() {
    const courseCards = document.querySelectorAll(".course-card");
    courseCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const courseName = card.querySelector("h3").textContent;
        utils.createRipple(card, e);
        this.modalManager.showModal("course", { title: courseName });
      });
    });
  }

  bindFacilityEvents() {
    const facilityCards = document.querySelectorAll(".facility-card");
    facilityCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const facilityName = card.querySelector("h3").textContent;
        utils.createRipple(card, e);
        this.modalManager.showModal("facility", { title: facilityName });
      });
    });
  }

  bindNoticeEvents() {
    const noticeItems = document.querySelectorAll(".notice-item");
    noticeItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        const title = item.querySelector(".notice-title").textContent;
        utils.createRipple(item, e);
        this.modalManager.showModal("notice", { title: title });
      });
    });
  }

  bindAuthEvents() {
    const loginBtn = document.querySelector(".login-btn");
    const signupBtn = document.querySelector(".signup-btn");

    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.modalManager.showModal("service", {
          title: "로그인",
          message: "로그인 페이지로 이동합니다.",
        });
      });
    }

    if (signupBtn) {
      signupBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.modalManager.showModal("service", {
          title: "회원가입",
          message: "회원가입 페이지로 이동합니다.",
        });
      });
    }
  }

  setupRippleEffects() {
    const rippleElements = document.querySelectorAll(
      "button, .service-item, .course-card, .facility-card, .notice-item"
    );

    rippleElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        utils.createRipple(element, e);
      });
    });
  }

  enhanceInteractions() {
    // Add enhanced click feedback to all interactive elements
    const interactiveElements = document.querySelectorAll(
      ".service-item, .course-card, .facility-card, .notice-item, .nav-menu a"
    );

    interactiveElements.forEach((element) => {
      this.transitionManager.addClickFeedback(element);
    });

    // Add pulse animation to important elements
    const importantElements = document.querySelectorAll(
      ".logo, .hero .main-title h1"
    );

    importantElements.forEach((element) => {
      element.classList.add("pulse");
    });

    // Enhanced navigation with transitions
    this.enhanceNavigation();
  }

  enhanceNavigation() {
    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach((link) => {
      link.addEventListener("click", async (e) => {
        e.preventDefault();

        const targetId = link.getAttribute("href");
        if (targetId.startsWith("#")) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            // Show transition
            await this.transitionManager.showTransition(300);

            // Scroll to section
            this.navigationManager.scrollToSection(targetSection);

            // Show transition again
            await this.transitionManager.showTransition(300);
          }
        }
      });
    });
  }

  // Public API methods
  showModal(type, data) {
    this.modalManager.showModal(type, data);
  }

  closeModal() {
    this.modalManager.closeModal();
  }

  // Cleanup method
  destroy() {
    if (this.heroSlider) {
      this.heroSlider.destroy();
    }
    this.animationManager.destroy();
    this.navigationManager.destroy();
    this.transitionManager.destroy();
  }
}

// Initialize the application
const app = new GosungApp();

// Make app available globally for debugging
window.gosungApp = app;

// Export for module usage
export default app;
