# 3D 자전거 포트폴리오

Bruno Simon 스타일의 인터랙티브 3D 포트폴리오입니다. 자전거를 조종하며 프로젝트를 탐험할 수 있습니다.

React, Three.js, React Three Fiber로 제작되었습니다.

## 주요 기능

- 자전거 조종 시스템 (WASD 키)
- 위에서 내려다보는 카메라 뷰
- 물리 엔진 기반 이동
- 사막 테마의 3D 환경
- 도로와 표지판
- 프로젝트 전시 시스템

## 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm 또는 yarn

### 설치

```bash
git clone https://github.com/Hun-Bot2/Hun-Bot2.github.io.git
cd Hun-Bot2.github.io
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` 접속

## 조작법

- W: 앞으로 이동
- S: 뒤로 이동
- A: 왼쪽으로 회전
- D: 오른쪽으로 회전

## 빌드 및 배포

### 로컬 빌드

```bash
npm run build
npm run preview
```

### GitHub Pages 배포

main 브랜치에 푸시하면 자동으로 배포됩니다.

수동 배포:
```bash
npm run deploy
```

## 기술 스택

- React 18.3 - UI 프레임워크
- Three.js 0.160 - 3D 그래픽
- React Three Fiber - Three.js React 렌더러
- React Three Rapier - 물리 엔진
- React Three Drei - Three.js 헬퍼
- Framer Motion - 애니메이션
- React Router DOM - 라우팅
- Vite - 빌드 도구
- TypeScript - 타입 시스템
- Zustand - 상태 관리

## 프로젝트 구조

```
Hun-Bot2.github.io/
├── src/
│   ├── components/
│   │   ├── BikeModel.tsx           # 자전거 3D 모델
│   │   ├── BikePhysics.tsx         # 자전거 물리 및 조작
│   │   ├── CameraController.tsx    # 카메라 컨트롤
│   │   ├── KeyboardControls.tsx    # 키보드 입력
│   │   ├── SceneModels.tsx         # 씬 오브젝트 (나무, 돌 등)
│   │   ├── Roads.tsx               # 도로 시스템
│   │   ├── InteractiveSigns.tsx    # 표지판
│   │   ├── ProjectMonitor.tsx      # 프로젝트 전시
│   │   ├── MapBoundaries.tsx       # 맵 경계
│   │   └── MapObstacles.tsx        # 장애물
│   ├── pages/
│   │   ├── BikeScene.tsx           # 메인 3D 씬
│   │   ├── About.jsx               # 소개 페이지
│   │   └── Contact.jsx             # 연락 페이지
│   ├── data/
│   │   ├── projects.ts             # 프로젝트 데이터
│   │   └── projects.json           # 프로젝트 JSON
│   ├── types/
│   │   └── index.ts                # TypeScript 타입
│   ├── store/
│   │   └── useStore.js             # Zustand 스토어
│   ├── App.jsx                     # 메인 앱
│   └── main.jsx                    # 엔트리 포인트
├── public/
│   └── models/                     # 3D 모델 파일
├── .github/
│   └── workflows/
│       └── deploy.yml              # 자동 배포 설정
├── package.json
├── tsconfig.json
├── vite.config.js
└── README.md
```

## 커스터마이징

### 1. 프로젝트 추가

`src/data/projects.json` 편집:

```json
{
  "id": "project-id",
  "title": "프로젝트 제목",
  "description": "설명",
  "technologies": ["React", "Node.js"],
  "category": "개인 프로젝트",
  "image": "/images/project.jpg",
  "github": "https://github.com/...",
  "demo": "https://demo-link.com"
}
```

### 2. 씬 설정 변경

`src/pages/BikeScene.tsx`에서:

- 조명 색상 및 강도 조정
- 배경 그라데이션 변경
- 안개 색상 및 거리 수정

### 3. 자전거 물리 조정

`src/components/BikePhysics.tsx`에서:

- `speed`: 이동 속도
- `rotationSpeed`: 회전 속도
- `mass`: 자전거 무게
- `linearDamping`: 감속도

### 4. 카메라 설정

`src/components/CameraController.tsx`에서:

- `height`: 카메라 높이
- `smoothness`: 카메라 부드러움
- `velocityFactor`: 속도 예측

## 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드 미리보기 |
| `npm run deploy` | GitHub Pages 배포 |

## 문제 해결

### 모델 로딩 오류

public/models/ 폴더에 필요한 3D 모델 파일이 있는지 확인하세요.

### 빌드 오류

캐시 삭제 및 재설치:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 배포 실패

1. 저장소 설정 → Pages → Source가 "GitHub Actions"인지 확인
2. Actions 탭에서 오류 로그 확인

## 라이선스

MIT License

## 문의

- GitHub: [@Hun-Bot2](https://github.com/Hun-Bot2)

마지막 업데이트: 2025년 11월
