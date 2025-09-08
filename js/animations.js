// Animation Module
export class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.mousePosition = { x: 0, y: 0 };
    this.cursor = null;
    this.isMouseMoving = false;
    this.mouseTimeout = null;
    this.init();
  }

  init() {
    // 페이지 로드 시 스크롤을 맨 위로 강제 이동
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    this.setupScrollAnimations();
    this.setupHoverAnimations();
    this.setupMouseTracking();
    this.setupMagneticElements();
    this.setupRippleEffect();
    this.setupFloatingElements();
    this.setupSmoothScroll();
    this.setupScrollProgress();
    this.setupMouseTrail();
    this.setupParticleSystem();
    this.setup3DTilt();
    this.setupTextAnimations();
    this.setupAdvancedEffects();
    this.setupMatrixRain();
    this.setupInteractiveParticles();
    this.setupMorphingShapes();
    this.setupHologramEffects();
    this.setupLightEffects();
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

  // 마우스 추적 및 커서 애니메이션
  setupMouseTracking() {
    // 커스텀 커서 생성
    this.createCustomCursor();

    // 마우스 움직임 추적
    document.addEventListener("mousemove", (e) => {
      this.mousePosition.x = e.clientX;
      this.mousePosition.y = e.clientY;
      this.isMouseMoving = true;

      // 커서 위치 업데이트 (기본 커서와 겹치지 않도록 오프셋)
      if (this.cursor) {
        this.cursor.style.left = `${e.clientX + this.cursorOffset.x}px`;
        this.cursor.style.top = `${e.clientY + this.cursorOffset.y}px`;
      }

      // 마우스 움직임 상태 리셋
      clearTimeout(this.mouseTimeout);
      this.mouseTimeout = setTimeout(() => {
        this.isMouseMoving = false;
      }, 100);
    });

    // 마우스가 화면을 벗어날 때
    document.addEventListener("mouseleave", () => {
      if (this.cursor) {
        this.cursor.style.opacity = "0";
      }
    });

    // 마우스가 화면에 들어올 때
    document.addEventListener("mouseenter", () => {
      if (this.cursor) {
        this.cursor.style.opacity = "1";
      }
    });
  }

  createCustomCursor() {
    this.cursor = document.createElement("div");
    this.cursor.className = "custom-cursor";
    this.cursor.innerHTML =
      '<div class="cursor-dot"></div><div class="cursor-outline"></div>';
    document.body.appendChild(this.cursor);

    // 기본 커서가 보이도록 커스텀 커서를 약간 오프셋
    this.cursorOffset = { x: 15, y: 15 };
  }

  // 자석 효과 요소들
  setupMagneticElements() {
    const magneticElements = document.querySelectorAll(
      ".service-item, .course-card, .facility-card, button, .btn"
    );

    magneticElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const strength = 0.3;
        element.style.transform = `translate(${x * strength}px, ${
          y * strength
        }px) scale(1.05)`;

        // 커스텀 커서에 호버 효과 추가
        if (this.cursor) {
          this.cursor.classList.add("hover");
        }
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "translate(0, 0) scale(1)";

        // 커스텀 커서 호버 효과 제거
        if (this.cursor) {
          this.cursor.classList.remove("hover");
        }
      });
    });
  }

  // 물결 효과
  setupRippleEffect() {
    document.addEventListener("click", (e) => {
      const ripple = document.createElement("div");
      const rect = e.target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(76, 175, 80, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1000;
      `;

      e.target.style.position = "relative";
      e.target.style.overflow = "hidden";
      e.target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  }

  // 떠다니는 요소들
  setupFloatingElements() {
    // 배경에 떠다니는 요소들 생성
    for (let i = 0; i < 5; i++) {
      this.createFloatingElement();
    }
  }

  createFloatingElement() {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.innerHTML = "🏌️";

    const size = Math.random() * 20 + 10;
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 10;

    element.style.cssText = `
      position: fixed;
      left: ${startX}px;
      top: ${startY}px;
      width: ${size}px;
      height: ${size}px;
      font-size: ${size}px;
      opacity: 0.1;
      pointer-events: none;
      z-index: 1;
      animation: float ${duration}s infinite linear;
    `;

    document.body.appendChild(element);

    // 마우스 근처에서 반응
    document.addEventListener("mousemove", () => {
      const distance = Math.sqrt(
        Math.pow(this.mousePosition.x - startX, 2) +
          Math.pow(this.mousePosition.y - startY, 2)
      );

      if (distance < 100) {
        element.style.opacity = "0.3";
        element.style.transform = "scale(1.2)";
      } else {
        element.style.opacity = "0.1";
        element.style.transform = "scale(1)";
      }
    });
  }

  // 부드러운 스크롤
  setupSmoothScroll() {
    let isScrolling = false;
    let scrollTimeout;

    window.addEventListener("scroll", () => {
      if (!isScrolling) {
        isScrolling = true;
        document.body.classList.add("is-scrolling");
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        document.body.classList.remove("is-scrolling");
      }, 150);
    });
  }

  // 향상된 패럴랙스 효과
  setupEnhancedParallax() {
    const parallaxElements = document.querySelectorAll("[data-parallax]");
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;

      parallaxElements.forEach((element) => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = rate * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", requestTick);
  }

  // 3D 틸트 효과
  setup3DTilt() {
    const tiltElements = document.querySelectorAll(
      ".course-card, .facility-card"
    );

    tiltElements.forEach((element) => {
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      });
    });
  }

  // 스크롤 진행 표시기
  setupScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + "%";
    });
  }

  // 마우스 트레일 효과
  setupMouseTrail() {
    let trailElements = [];
    const maxTrailLength = 10;

    document.addEventListener("mousemove", (e) => {
      const trail = document.createElement("div");
      trail.className = "mouse-trail";
      trail.style.left = e.clientX + "px";
      trail.style.top = e.clientY + "px";

      document.body.appendChild(trail);
      trailElements.push(trail);

      if (trailElements.length > maxTrailLength) {
        const oldTrail = trailElements.shift();
        oldTrail.remove();
      }

      setTimeout(() => {
        trail.remove();
        const index = trailElements.indexOf(trail);
        if (index > -1) {
          trailElements.splice(index, 1);
        }
      }, 500);
    });
  }

  // 파티클 시스템
  setupParticleSystem() {
    setInterval(() => {
      if (Math.random() < 0.3) {
        this.createParticle();
      }
    }, 200);
  }

  createParticle() {
    const particle = document.createElement("div");
    particle.className = "particle";

    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 4 + 2;

    particle.style.cssText = `
      left: ${startX}px;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 3 + 2}s;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 5000);
  }

  // 텍스트 애니메이션
  setupTextAnimations() {
    // 타이핑 효과
    const typingElements = document.querySelectorAll(
      ".main-title h1, .main-title h2"
    );
    typingElements.forEach((element, index) => {
      setTimeout(() => {
        this.typeText(element, element.textContent, 100);
      }, index * 1000);
    });

    // 글리터 효과
    const glitterElements = document.querySelectorAll(
      ".service-item, .course-card"
    );
    glitterElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("glitter");
      });

      element.addEventListener("mouseleave", () => {
        element.classList.remove("glitter");
      });
    });
  }

  typeText(element, text, speed) {
    element.textContent = "";
    element.classList.add("typing-text");

    let i = 0;
    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;

      if (i > text.length) {
        clearInterval(timer);
        element.classList.remove("typing-text");
      }
    }, speed);
  }

  // 모핑 애니메이션
  setupMorphingShapes() {
    const shapes = document.querySelectorAll(".logo-circle");
    shapes.forEach((shape) => {
      shape.classList.add("morphing-shape");
    });
  }

  // 웨이브 효과
  setupWaveEffect() {
    const waveElements = document.querySelectorAll(".service-item");
    waveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("wave-effect");
      });

      element.addEventListener("mouseleave", () => {
        element.classList.remove("wave-effect");
      });
    });
  }

  // 스크롤 기반 애니메이션 강화
  setupEnhancedScrollAnimations() {
    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: "0px 0px -100px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const ratio = entry.intersectionRatio;

        if (ratio > 0.5) {
          entry.target.classList.add("fade-in", "visible");
        }

        // 스크롤 진행에 따른 추가 효과
        if (entry.target.classList.contains("section-header")) {
          entry.target.style.transform = `translateY(${(1 - ratio) * 50}px)`;
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      ".section-header, .about-content, .course-card, .facility-card, .notice-item"
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });
  }

  // 마우스 근접 효과
  setupProximityEffects() {
    const elements = document.querySelectorAll(".service-item, .course-card");

    document.addEventListener("mousemove", (e) => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        const maxDistance = 200;
        const proximity = Math.max(0, 1 - distance / maxDistance);

        if (proximity > 0.1) {
          element.style.transform = `scale(${1 + proximity * 0.1})`;
          element.style.filter = `brightness(${1 + proximity * 0.2})`;
        } else {
          element.style.transform = "scale(1)";
          element.style.filter = "brightness(1)";
        }
      });
    });
  }

  // 고급 효과들
  setupAdvancedEffects() {
    // 그라데이션 배경 추가
    this.addGradientBackground();

    // 네온 글로우 효과
    this.setupNeonGlow();

    // 글래스모피즘 효과
    this.setupGlassmorphism();

    // 무지개 테두리 효과
    this.setupRainbowBorders();

    // 리퀴드 효과
    this.setupLiquidEffects();

    // 스타라이트 효과
    this.setupStarlightEffects();
  }

  addGradientBackground() {
    const body = document.body;
    body.classList.add("animated-gradient");
  }

  setupNeonGlow() {
    const neonElements = document.querySelectorAll(
      ".service-item, .course-card, .facility-card"
    );
    neonElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        element.classList.add("neon-glow");
      });

      element.addEventListener("mouseleave", () => {
        element.classList.remove("neon-glow");
      });
    });
  }

  setupGlassmorphism() {
    const cards = document.querySelectorAll(".course-card, .facility-card");
    cards.forEach((card) => {
      card.classList.add("glassmorphism");
    });
  }

  setupRainbowBorders() {
    const specialElements = document.querySelectorAll(".service-item");
    specialElements.forEach((element) => {
      element.classList.add("rainbow-border");
    });
  }

  setupLiquidEffects() {
    const liquidElements = document.querySelectorAll(
      ".about-content, .section-header"
    );
    liquidElements.forEach((element) => {
      element.classList.add("liquid-effect");
    });
  }

  setupStarlightEffects() {
    const starlightElements = document.querySelectorAll(
      ".main-title h1, .main-title h2"
    );
    starlightElements.forEach((element) => {
      element.classList.add("starlight");
    });
  }

  // 매트릭스 레인 효과
  setupMatrixRain() {
    const matrixContainer = document.createElement("div");
    matrixContainer.className = "matrix-rain";
    document.body.appendChild(matrixContainer);

    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

    setInterval(() => {
      if (Math.random() < 0.1) {
        this.createMatrixChar(matrixContainer, chars);
      }
    }, 100);
  }

  createMatrixChar(container, chars) {
    const char = document.createElement("div");
    char.className = "matrix-char";
    char.textContent = chars[Math.floor(Math.random() * chars.length)];
    char.style.left = Math.random() * window.innerWidth + "px";
    char.style.animationDuration = Math.random() * 3 + 2 + "s";

    container.appendChild(char);

    setTimeout(() => {
      char.remove();
    }, 5000);
  }

  // 인터랙티브 파티클 시스템
  setupInteractiveParticles() {
    setInterval(() => {
      if (Math.random() < 0.2) {
        this.createInteractiveParticle();
      }
    }, 300);
  }

  createInteractiveParticle() {
    const particle = document.createElement("div");
    particle.className = "interactive-particle";

    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;

    particle.style.cssText = `
      left: ${startX}px;
      top: ${startY}px;
      animation-duration: ${Math.random() * 2 + 3}s;
    `;

    document.body.appendChild(particle);

    // 마우스 근처에서 반응
    const checkMouseProximity = () => {
      const distance = Math.sqrt(
        Math.pow(this.mousePosition.x - startX, 2) +
          Math.pow(this.mousePosition.y - startY, 2)
      );

      if (distance < 150) {
        particle.style.transform = `scale(${1 + (150 - distance) / 150})`;
        particle.style.opacity = "1";
      } else {
        particle.style.transform = "scale(1)";
        particle.style.opacity = "0.7";
      }
    };

    document.addEventListener("mousemove", checkMouseProximity);

    setTimeout(() => {
      particle.remove();
      document.removeEventListener("mousemove", checkMouseProximity);
    }, 5000);
  }

  // 모핑 도형들
  setupMorphingShapes() {
    // 배경에 모핑 도형들 추가
    for (let i = 0; i < 3; i++) {
      this.createMorphingShape();
    }
  }

  createMorphingShape() {
    const shape = document.createElement("div");
    shape.className = "morphing-shape";

    const size = Math.random() * 100 + 50;
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);

    shape.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      z-index: 1;
      pointer-events: none;
      opacity: 0.1;
    `;

    document.body.appendChild(shape);

    // 마우스 근처에서 반응
    document.addEventListener("mousemove", () => {
      const distance = Math.sqrt(
        Math.pow(this.mousePosition.x - (x + size / 2), 2) +
          Math.pow(this.mousePosition.y - (y + size / 2), 2)
      );

      if (distance < 200) {
        shape.style.opacity = "0.3";
        shape.style.transform = `scale(${1 + (200 - distance) / 200})`;
      } else {
        shape.style.opacity = "0.1";
        shape.style.transform = "scale(1)";
      }
    });
  }

  // 홀로그램 효과
  setupHologramEffects() {
    const hologramElements = document.querySelectorAll(
      ".about-image, .course-image"
    );
    hologramElements.forEach((element) => {
      element.classList.add("hologram");
    });
  }

  // 조명 효과
  setupLightEffects() {
    // 동적 조명 효과
    this.createDynamicLighting();

    // 스포트라이트 효과
    this.setupSpotlightEffect();
  }

  createDynamicLighting() {
    const light = document.createElement("div");
    light.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
        transparent 0%,
        rgba(76, 175, 80, 0.1) 30%,
        transparent 70%
      );
      pointer-events: none;
      z-index: 1;
      transition: all 0.1s ease;
    `;

    document.body.appendChild(light);

    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      light.style.setProperty("--mouse-x", x + "%");
      light.style.setProperty("--mouse-y", y + "%");
    });
  }

  setupSpotlightEffect() {
    const spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(
        circle at var(--spot-x, 50%) var(--spot-y, 50%),
        transparent 0%,
        rgba(0, 0, 0, 0.1) 40%,
        rgba(0, 0, 0, 0.3) 100%
      );
      pointer-events: none;
      z-index: 2;
      transition: all 0.3s ease;
    `;

    document.body.appendChild(spotlight);

    document.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      spotlight.style.setProperty("--spot-x", x + "%");
      spotlight.style.setProperty("--spot-y", y + "%");
    });
  }

  // 3D 카드 효과 강화
  setupEnhanced3DCards() {
    const cards = document.querySelectorAll(".course-card, .facility-card");
    cards.forEach((card) => {
      card.classList.add("card-3d");

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform =
          "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      });
    });
  }

  destroy() {
    // Clean up observers
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();

    // 커서 제거
    if (this.cursor) {
      this.cursor.remove();
    }

    // 떠다니는 요소들 제거
    document.querySelectorAll(".floating-element").forEach((el) => el.remove());

    // 매트릭스 레인 제거
    const matrixRain = document.querySelector(".matrix-rain");
    if (matrixRain) {
      matrixRain.remove();
    }

    // 모핑 도형들 제거
    document.querySelectorAll(".morphing-shape").forEach((el) => el.remove());
  }
}
