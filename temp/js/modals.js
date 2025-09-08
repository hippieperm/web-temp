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
    return `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3>${data.title || "서비스"}</h3>
        <p>이 서비스는 현재 준비 중입니다. 곧 만나보실 수 있습니다!</p>
        <button class="modal-btn">확인</button>
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

  closeModal() {
    if (this.activeModal) {
      this.activeModal.remove();
      this.activeModal = null;

      // Restore body scroll
      document.body.style.overflow = "";
    }
  }
}
