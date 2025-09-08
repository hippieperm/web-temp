# 고성 컨트리클럽 웹사이트

## 📁 프로젝트 구조

```
gosung/
├── index.html                 # 메인 HTML 파일
├── css/                      # CSS 모듈
│   ├── base.css             # 기본 스타일, 유틸리티
│   ├── header.css           # 헤더 및 네비게이션
│   ├── hero.css             # 히어로 섹션
│   ├── sections.css         # 각 섹션별 스타일
│   ├── footer.css           # 푸터
│   └── modals.css           # 모달 및 팝업
├── js/                       # JavaScript 모듈
│   ├── main.js              # 메인 애플리케이션
│   ├── utils.js             # 유틸리티 함수
│   ├── hero.js              # 히어로 슬라이더
│   ├── modals.js            # 모달 관리
│   ├── animations.js        # 애니메이션 관리
│   └── navigation.js        # 네비게이션 관리
└── README.md                # 프로젝트 문서
```

## 🚀 기능

### 주요 기능

- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **히어로 슬라이더**: 자동 전환되는 이미지 슬라이더
- **인터랙티브 카드**: 호버 효과가 있는 서비스 카드
- **모달 시스템**: 동적 모달 팝업
- **부드러운 스크롤**: 섹션 간 부드러운 이동
- **애니메이션**: 스크롤 기반 애니메이션

### 섹션

1. **히어로**: 메인 슬라이더와 프로모션 배너
2. **서비스**: 6개의 주요 서비스 카드
3. **클럽 소개**: 골프장 소개 및 특징
4. **코스 소개**: 3개 홀의 상세 정보
5. **부대시설**: 프로샵, 레스토랑, 사우나, 주차장
6. **공지사항**: 최신 소식 및 이벤트
7. **푸터**: 연락처 및 링크 정보

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript ES6+**: 모듈 시스템, 클래스
- **Google Fonts**: Noto Sans KR

## 📱 반응형 브레이크포인트

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: ~479px

## 🔧 개발 및 유지보수

### CSS 모듈 구조

- `base.css`: 기본 스타일, 유틸리티 클래스
- `header.css`: 헤더, 로고, 네비게이션
- `hero.css`: 히어로 섹션, 슬라이더
- `sections.css`: 모든 콘텐츠 섹션
- `footer.css`: 푸터 스타일
- `modals.css`: 모달 및 팝업

### JavaScript 모듈 구조

- `main.js`: 애플리케이션 진입점
- `utils.js`: 공통 유틸리티 함수
- `hero.js`: 히어로 슬라이더 클래스
- `modals.js`: 모달 관리 클래스
- `animations.js`: 애니메이션 관리 클래스
- `navigation.js`: 네비게이션 관리 클래스

### 수정 방법

#### CSS 수정

1. 해당 기능의 CSS 파일을 찾아 수정
2. 예: 헤더 수정 → `css/header.css`
3. 예: 모달 수정 → `css/modals.css`

#### JavaScript 수정

1. 해당 기능의 JS 파일을 찾아 수정
2. 예: 슬라이더 수정 → `js/hero.js`
3. 예: 모달 수정 → `js/modals.js`

#### 새 기능 추가

1. CSS: `css/sections.css`에 새 섹션 스타일 추가
2. JS: 새 모듈 파일 생성 후 `main.js`에서 import

## 🎨 디자인 시스템

### 색상

- **Primary**: #4CAF50 (초록)
- **Secondary**: #8BC34A (라이트 그린)
- **Accent**: #FF6B35 (오렌지)
- **Text**: #333 (다크 그레이)
- **Background**: #F8F9FA (라이트 그레이)

### 타이포그래피

- **Font Family**: Noto Sans KR, Malgun Gothic, Arial
- **Headings**: 300-700 weight
- **Body**: 400 weight

### 간격

- **Container**: max-width 1200px
- **Section Padding**: 100px 0
- **Card Padding**: 20-40px

