// Navigation Module
export class NavigationManager {
  constructor() {
    this.navLinks = document.querySelectorAll(".nav-menu a");
    this.mobileMenuBtn = null;
    this.navMenu = document.querySelector(".nav-menu");
    this.header = document.querySelector("header");
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    // 페이지 로드 시 스크롤을 맨 위로 강제 이동
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // 추가로 DOM이 완전히 로드된 후에도 스크롤 위치 확인
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    this.setupMobileMenu();
    this.bindEvents();
    this.setupScrollEffects();
  }

  setupMobileMenu() {
    // Create mobile menu button if it doesn't exist
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    if (!this.mobileMenuBtn) {
      this.mobileMenuBtn = document.createElement("button");
      this.mobileMenuBtn.classList.add("mobile-menu-btn");
      this.mobileMenuBtn.innerHTML = "☰";
      this.mobileMenuBtn.style.display = "none";

      const navContainer = document.querySelector(".main-nav .container");
      if (navContainer) {
        navContainer.appendChild(this.mobileMenuBtn);
      }
    }
  }

  bindEvents() {
    // Smooth scrolling for navigation links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");

        if (targetId.startsWith("#")) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            this.scrollToSection(targetSection);
          }
        }
      });
    });

    // Mobile menu toggle
    if (this.mobileMenuBtn) {
      this.mobileMenuBtn.addEventListener("click", () => {
        this.toggleMobileMenu();
      });
    }

    // Close mobile menu when clicking on links
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !this.navMenu.contains(e.target) &&
        !this.mobileMenuBtn.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });
  }

  setupScrollEffects() {
    let ticking = false;

    const updateScrollEffects = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // Header background effect
      if (scrollTop > 100) {
        this.header.style.background = "rgba(255, 255, 255, 0.95)";
        this.header.style.backdropFilter = "blur(10px)";
        this.header.style.boxShadow = "0 2px 20px rgba(0,0,0,0.1)";
      } else {
        this.header.style.background = "white";
        this.header.style.backdropFilter = "none";
        this.header.style.boxShadow = "none";
      }

      // Parallax effect for hero section
      const hero = document.querySelector(".hero");
      if (hero) {
        hero.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }

      // Update active navigation
      this.updateActiveNav();

      this.lastScrollTop = scrollTop;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
  }

  scrollToSection(section) {
    const headerHeight = this.header.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight;

    window.scrollTo({
      top: sectionTop,
      behavior: "smooth",
    });
  }

  toggleMobileMenu() {
    if (this.navMenu) {
      this.navMenu.classList.toggle("active");
    }
  }

  closeMobileMenu() {
    if (this.navMenu) {
      this.navMenu.classList.remove("active");
    }
  }

  // Update active navigation based on scroll position
  updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    // 페이지 상단에 있을 때는 첫 번째 섹션을 활성화
    if (scrollPos < 200) {
      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#club") {
          link.classList.add("active");
        }
      });
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        this.navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  destroy() {
    // Remove event listeners if needed
    this.navLinks.forEach((link) => {
      link.removeEventListener("click", this.handleNavClick);
    });
  }
}
