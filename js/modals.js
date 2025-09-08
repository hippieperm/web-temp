// Modal Module
export class ModalManager {
  constructor() {
    this.activeModal = null;
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    // Close modal on escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.activeModal) {
        this.closeModal();
      }
    });
  }

  showModal(type, data = {}) {
    const modal = this.createModal(type, data);
    document.body.appendChild(modal);
    this.activeModal = modal;

    // Prevent body scroll
    document.body.style.overflow = "hidden";

    // Focus management
    const firstFocusable = modal.querySelector(
      "button, input, textarea, select, a[href]"
    );
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }

  createModal(type, data) {
    const modal = document.createElement("div");
    modal.className = "modal";

    let content = "";

    switch (type) {
      case "service":
        content = this.createServiceModal(data);
        break;
      case "course":
        content = this.createCourseModal(data);
        break;
      case "facility":
        content = this.createFacilityModal(data);
        break;
      case "notice":
        content = this.createNoticeModal(data);
        break;
      default:
        content = this.createDefaultModal(data);
    }

    modal.innerHTML = content;

    // Bind close events
    this.bindModalEvents(modal);

    return modal;
  }

  createServiceModal(data) {
    const serviceInfo = this.getServiceInfo(data.title);
    return `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${data.title || "서비스"}</h3>
        <div class="service-details">
          <p>${serviceInfo.description}</p>
          <div class="service-features">
            ${serviceInfo.features
              .map((feature) => `<div class="feature-item">✓ ${feature}</div>`)
              .join("")}
          </div>
          <div class="service-actions">
            <button class="modal-btn primary" onclick="window.open('${
              serviceInfo.link
            }', '_blank')">바로가기</button>
            <button class="modal-btn secondary">자세히 보기</button>
          </div>
        </div>
      </div>
    `;
  }

  createCourseModal(data) {
    return `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${data.title || "코스 정보"}</h3>
        <div class="course-details">
          <p>이 홀의 상세 정보와 플레이 팁을 확인하세요.</p>
          <div class="course-stats">
            <div class="stat">
              <span class="label">파</span>
              <span class="value">4</span>
            </div>
            <div class="stat">
              <span class="label">거리</span>
              <span class="value">420야드</span>
            </div>
            <div class="stat">
              <span class="label">난이도</span>
              <span class="value">쉬움</span>
            </div>
          </div>
        </div>
        <button class="modal-btn">확인</button>
      </div>
    `;
  }

  createFacilityModal(data) {
    return `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${data.title || "부대시설"}</h3>
        <div class="facility-details">
          <p>이 시설에 대한 상세 정보를 확인하세요.</p>
          <div class="facility-info">
            <p><strong>운영시간:</strong> 06:00 - 22:00</p>
            <p><strong>위치:</strong> 클럽하우스 1층</p>
            <p><strong>문의:</strong> 055-123-4567</p>
          </div>
        </div>
        <button class="modal-btn">확인</button>
      </div>
    `;
  }

  createNoticeModal(data) {
    return `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${data.title || "공지사항"}</h3>
        <div class="notice-content">
          <p>상세 내용이 여기에 표시됩니다.</p>
          <p>이 공지사항에 대한 자세한 정보를 확인하실 수 있습니다.</p>
        </div>
        <button class="modal-btn">확인</button>
      </div>
    `;
  }

  createDefaultModal(data) {
    return `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${data.title || "알림"}</h3>
        <p>${data.message || "내용이 없습니다."}</p>
        <button class="modal-btn">확인</button>
      </div>
    `;
  }

  bindModalEvents(modal) {
    const closeBtn = modal.querySelector(".close-modal");
    const confirmBtn = modal.querySelector(".modal-btn");

    const closeModal = () => this.closeModal();

    closeBtn.addEventListener("click", closeModal);
    confirmBtn.addEventListener("click", closeModal);

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  getServiceInfo(serviceName) {
    const services = {
      GUIDE: {
        description:
          "고성 컨트리클럽 이용 안내를 확인하세요. 운영시간, 예약 방법, 이용 규정 등을 자세히 안내해드립니다.",
        features: ["운영시간 안내", "예약 방법", "이용 규정", "주차 안내"],
        link: "#club",
      },
      RESERVATION: {
        description:
          "온라인으로 간편하게 골프장 예약을 하실 수 있습니다. 실시간 예약 현황을 확인하고 원하는 시간에 예약하세요.",
        features: [
          "실시간 예약",
          "예약 현황 확인",
          "예약 변경/취소",
          "예약 알림",
        ],
        link: "#reservation",
      },
      "RESERVATION WAIT": {
        description:
          "원하시는 시간에 예약이 없을 경우 대기 예약을 신청하실 수 있습니다. 취소 발생 시 자동으로 연락드립니다.",
        features: [
          "대기 예약 신청",
          "자동 알림",
          "취소 시 연락",
          "대기 순서 확인",
        ],
        link: "#reservation",
      },
      "CHARGE GUIDE": {
        description:
          "골프장 이용 요금과 각종 부대시설 이용료를 확인하세요. 회원 할인과 시즌별 요금을 안내해드립니다.",
        features: ["그린피 요금", "회원 할인", "시즌별 요금", "부대시설 요금"],
        link: "#charge",
      },
      JOIN: {
        description:
          "다른 골퍼들과 함께 라운드를 즐기고 싶으시다면 조인 게시판을 이용해보세요. 새로운 골프 친구를 만나보세요.",
        features: ["조인 모집", "조인 신청", "골프 친구 찾기", "라운드 후기"],
        link: "#join",
      },
      NOTICE: {
        description:
          "골프장 운영과 관련된 중요한 공지사항과 이벤트 정보를 확인하세요. 최신 소식을 놓치지 마세요.",
        features: ["운영 공지", "이벤트 정보", "코스 정비", "특별 안내"],
        link: "#inquiry",
      },
      로그인: {
        description:
          "회원 로그인을 통해 더 많은 서비스를 이용하실 수 있습니다. 예약 내역 확인과 회원 전용 혜택을 누려보세요.",
        features: ["회원 로그인", "예약 내역", "회원 혜택", "개인정보 관리"],
        link: "/login",
      },
      회원가입: {
        description:
          "고성 컨트리클럽 회원이 되어 특별한 혜택을 받아보세요. 온라인으로 간편하게 가입하실 수 있습니다.",
        features: ["온라인 가입", "회원 혜택", "우선 예약", "특별 이벤트"],
        link: "/signup",
      },
    };

    return (
      services[serviceName] || {
        description: "서비스에 대한 상세 정보를 확인하세요.",
        features: ["상세 정보", "이용 안내", "문의하기"],
        link: "#",
      }
    );
  }

  closeModal() {
    if (this.activeModal) {
      this.activeModal.remove();
      this.activeModal = null;

      // Restore body scroll
      document.body.style.overflow = "";
    }
  }
}
