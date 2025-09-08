// Hero Slider Module
export class HeroSlider {
  constructor() {
    this.slides = document.querySelectorAll(".slide");
    this.dots = document.querySelectorAll(".dot");
    this.prevBtn = document.querySelector(".prev-btn");
    this.nextBtn = document.querySelector(".next-btn");
    this.currentSlide = 0;
    this.slideInterval = null;
    this.autoPlayDelay = 5000;

    this.init();
  }

  init() {
    this.bindEvents();
    this.startSlideShow();
  }

  bindEvents() {
    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        this.stopSlideShow();
        this.showSlide(index);
        this.startSlideShow();
      });
    });

    // Button navigation
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.stopSlideShow();
        this.nextSlide();
        this.startSlideShow();
      });
    }

    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.stopSlideShow();
        this.prevSlide();
        this.startSlideShow();
      });
    }

    // Pause on hover
    const hero = document.querySelector(".hero");
    if (hero) {
      hero.addEventListener("mouseenter", () => this.stopSlideShow());
      hero.addEventListener("mouseleave", () => this.startSlideShow());
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.stopSlideShow();
        this.prevSlide();
        this.startSlideShow();
      } else if (e.key === "ArrowRight") {
        this.stopSlideShow();
        this.nextSlide();
        this.startSlideShow();
      }
    });
  }

  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
    });
    this.currentSlide = index;
  }

  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }

  prevSlide() {
    const prev =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoPlayDelay);
  }

  stopSlideShow() {
    clearInterval(this.slideInterval);
  }

  destroy() {
    this.stopSlideShow();
    // Remove event listeners if needed
  }
}
