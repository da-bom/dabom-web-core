# 📱 Dabom Service Web
![표지](https://github.com/user-attachments/assets/764748e9-77ff-4224-8c0f-be17f3cbe957)


우리 가족의 디지털 사용량을 한눈에 관리하고 실시간으로 소통하는 PWA 기반 모바일 웹 서비스입니다.  

---
# 서비스
## 1. 홈 화면
| 홈 화면(리스트) | 홈 화면(파이 차트)|
| :--: | :--: |
|<img width="309" height="680" alt="스크린샷 2026-03-20 오전 1 25 40" src="https://github.com/user-attachments/assets/f066668e-14ad-4e12-b2d1-02eaae2d1e94" />| <img width="309" height="680" alt="스크린샷 2026-03-20 오전 1 25 54" src="https://github.com/user-attachments/assets/e6f31b13-dfa3-4136-92fb-8f5b07d22e6d" />|

- **실시간 데이터 시각화**: SSE를 활용하여 가족 구성원의 데이터 사용량을 실시간 업데이트합니다.
- **직관적인 대시보드**: 리스트와 파이 차트 형태의 UI를 통해 전체 및 개별 데이터 잔여량을 한눈에 파악할 수 있습니다.

## 2. 정책
| 정책 화면 |
| :--: |
| <video width="309" height="681" src="https://github.com/user-attachments/assets/e9827f37-0b19-4648-9ac6-ff3090186148" /> |

- **역할 기반 정책 제어**: 부모는 구성원별로 데이터 사용량, 이용 시간대, 특정 앱 차단 여부를 유연하게 설정할 수 있습니다.
- **실시간 정책 반영**: 변경된 정책은 즉시 시스템에 적용되어 데이터 사용을 제한하거나 허용합니다.
- **세부 제어 항목**:
  - **데이터 한도**: 월간 사용량을 GB 단위로 제한
  - **이용 시간**: 일일 사용 가능한 시간대 지정
  - **앱 차단**: 앱별 접속 제어

## 3. 미션, 
| 미션 화면 | 미션 히스토리 |
| :--: | :--: |
| <video width="309" height="681" src="https://github.com/user-attachments/assets/a3549512-b90e-49e7-b0e1-14e78089962d" /> | <video width="309" height="681" src="https://github.com/user-attachments/assets/40bcd7b1-91df-438a-8479-35f277682dac" /> | 

- **역할별 맞춤 UI**: 사용자의 역할(부모/자녀)에 따라 미션 관리 권한이 다르게 부여됩니다.
  - **부모(Owner)**: 미션 생성 및 자녀의 보상 요청 승인/거절 권한을 가집니다.
  - **자녀(Member)**: 할당된 미션을 확인하고, 완료 시 부모에게 보상을 요청할 수 있습니다.
- **보상**: 미션 성공 시 실시간 데이터 증설이나 약속된 보상을 제공합니다.
- **히스토리 관리**: 지난 미션 내역을 날짜별로 기록하여 가족 간의 약속과 성취를 투명하게 공유합니다.

## 4. 이의제기
| 이의제기 생성 | 코멘트 | 이의제기 거절 |
| :--: | :--: | :--: |
| <video width="309" height="681" src="https://github.com/user-attachments/assets/9f2582bb-dac5-455d-b844-f488a08fc710" /> | <video width="309" height="681" src="https://github.com/user-attachments/assets/5dfc31f3-aa6d-4725-a506-71034ad6a404" /> | <video width="309" height="681" src="https://github.com/user-attachments/assets/00eecff3-2293-4e1d-b4a9-4b0b609a19dd" /> |

- **상호간의 정책 조율**: 부모의 일방적인 차단이 아닌, '이의제기'를 통해 자녀가 필요한 데이터와 사유를 직접 전달할 수 있습니다.
- **코멘트 협상**: 이의제기 상세 페이지에서 부모와 자녀가 실시간으로 코멘트를 주고받으며 정책 변경에 대해 협상합니다.
- **투명한 피드백**: 부모는 요청을 승인하거나, 명확한 사유와 함께 거절함으로써 가족 간의 신뢰와 소통을 강화합니다.

## 5. 긴급 쿼터 요청

| 미션 화면 |
| :--: |
| <video width="309" height="681" src="https://github.com/user-attachments/assets/fdc38ba6-a1a0-4c01-a357-0911f485276f" /> |

- - **긴급 데이터 요청**: 자녀가 긴급한 상황에서 빠르게 데이터를 할당받을 수 있는 긴급 쿼터 시스템을 제공합니다.

## 6. 리캡
| 리캡 화면 |
| :--: |
| <video width="309" height="681" src="https://github.com/user-attachments/assets/ad420429-335f-49bc-a928-5543a0c4d613" /> |

- **데이터 스토리텔링**: 한 달간의 사용 패턴을 요일별 사용량, 피크 타임, 이의제기 현황 등 6단계의 인터랙티브 리포트로 구성하여 제공합니다.
- **긍정적 관계 조명**: '이달의 천사(가장 많이 승인해준 보호자)' 등 가족 간의 긍정적인 소통 사례를 강조합니다.
- **최종 소통 점수**: 사용량 관리와 소통 빈도를 종합 분석하여 산출된 '소통 점수'를 통해 우리 가족의 소통 습관을 바라볼 수 있습니다.


## 7. PWA 알람
| 알람 화면 |
| :--: |
| <img width="1020" height="852" alt="image" src="https://github.com/user-attachments/assets/ec6a172e-9af0-4bc2-a1b7-74ad7c7e969f" /> |

- **실시간 소통**: 이의제기 코멘트 등록, 미션 승인 요청, 데이터 한도 도달, 정책 변경, 긴급 쿼터 요청 등 즉각적인 확인이 필요한 상황에서 가족 구성원에게 알림을 발송합니다.
- **백그라운드 메시징**: 브라우저가 닫혀 있는 상태에서도 VAPID 인증 기반의 푸시 서비스를 통해 알람을 제공합니다.

---

# 어드민
## 1. 대시보드
| 대시보드 |
| :--: |
| <img width="2046" height="914" alt="스크린샷 2026-03-20 오전 3 20 16" src="https://github.com/user-attachments/assets/7c35f7ff-b892-4c64-8eee-854384fd3d42" /> |

- **지표 모니터링**: 전체 가입자, 활성 가족 수, 데이터 총 트래픽 등 서비스 핵심 지표를 시각화합니다.
- **시스템 건강 상태**: Redis, Kafka, MySQL 등 핵심 인프라의 생존 여부와 실시간 TPS를 모니터링합니다.
- **최근 차단 확인**: 최근 차단 내역을 확인할 수 있습니다.

## 2. 정책 관리
| 정책 관리 |
| :--: |
| <video width="1917" height="927" src="https://github.com/user-attachments/assets/9bb23e62-a609-4950-ba3f-e761d41f88dc" /> |

- **전체 정책 가시성**: 서비스 내 모든 정책(데이터 한도, 시간 제한, 수동 차단, 앱 차단)을 조회하고 활성화 상태별로 필터링하여 관리합니다.
- **정교한 규칙 커스터마이징**: 서랍(Drawer) UI를 통해 정책별 권한(Role), 설명, 그리고 타입별 기본값(MB/GB 단위 한도, 00:00 형식의 시간대)을 정교하게 수정합니다.
- **안전한 배포 및 제어**: 시스템 필수 정책은 비활성화를 방지하여 서비스 안정성을 유지하며, 정책 수정 시 기존 유저의 설정을 유지할지 혹은 강제로 덮어쓸지(Overwrite) 선택하여 배포할 수 있습니다.

## 3. 가족 관리
| 가족 관리 |
| :--: |
| <img width="1917" height="927" alt="스크린샷 2026-03-19 오후 11 24 52" src="https://github.com/user-attachments/assets/9376d074-9a97-4283-9d88-ba4d8bf8c705" /> |

- **지능형 사용자 검색**: 이름, 전화번호는 물론 '데이터 사용량 범위(%)' 필터를 통해 집중 관리가 필요한 가족을 탐색합니다.
- **구성원 상세 정보**: 가족 그룹별 역할(Owner/Member) 배정 상태와 개별 기기 사용 현황을 조회하거나 변경합니다.

## 4. 보상관리
| 보상 관리 |
| :--: |
| <video width="1917" height="927" src="https://github.com/user-attachments/assets/006c1f3f-ff21-4786-90d5-54a4ea08e760" /> |


- **보상 아이템 운영**: 데이터 증설권 및 기프티콘 등 미션 보상으로 지급되는 다양한 아이템의 인벤토리를 관리합니다.
- **지급 내역 추적**: 미션 성공에 따른 실제 보상 지급 현황을 실시간으로 추적하여 관리합니다.
---

## 모노레포 아키텍처 (Monorepo Architecture)

- **Turborepo**와 **pnpm workspaces**를 활용하여 개발 생산성을 높이고 서비스 간 일관성을 유지합니다.

### 프로젝트 구조 (Structure)

```text
dabom-web-core/
├── apps/
│   ├── service/          # [Service App] 일반 사용자용 PWA 서비스
│   │   └── 주요 기능: 실시간 대시보드, 이의제기, 미션, 리캡
│   └── admin/            # [Admin App] 시스템 관리자용 관제 센터
│       └── 주요 기능: 서비스 모니터링, 가족/정책/보상 통합 관리
├── packages/
│   └── shared/           # [Shared Package] 전역 공유 리소스 (@repo/shared)
│       ├── api/          # Axios 인스턴스 및 공통 API 인터페이스
│       ├── components/   # 디자인 시스템 기반 공통 UI (Button, Input, Table 등)
│       ├── hooks/        # SSE 구독, Auth, Push 알림 등 공통 커스텀 훅
│       ├── utils/        # 데이터 포맷팅, 단위 변환(bytesToGB) 유틸리티
│       └── configs/      # Tailwind, ESLint, TSConfig 등 공유 설정
├── turbo.json            # Turborepo 빌드 파이프라인 및 캐싱 설정
└── pnpm-workspace.yaml   # pnpm 워크스페이스 정의
```

### 기술 스택 (Tech Stack)

| 분야 | 기술 스택 |
| :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white) ![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)|
| **State Management** | ![Zustand](https://img.shields.io/badge/Zustand_5-443E38?style=flat-square&logo=react&logoColor=white) ![TanStack Query](https://img.shields.io/badge/TanStack_Query_v5-FF4154?style=flat-square&logo=react-query&logoColor=white) |
| **Package & Monorepo** | ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white) ![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&logo=turborepo&logoColor=white) |
| **Code Quality** | ![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=flat-square&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7BA3E?style=flat-square&logo=prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-663399?style=flat-square&logo=git&logoColor=white) ![Zod](https://img.shields.io/badge/Zod-3068B7?style=flat-square&logo=zod&logoColor=white) |
| **Real-time & PWA** | ![SSE](https://img.shields.io/badge/Server--Sent_Events-000000?style=flat-square&logo=server&logoColor=white) ![PWA](https://img.shields.io/badge/Progressive_Web_App-5A0FC8?style=flat-square&logo=pwa&logoColor=white) |

### 로컬 개발 환경 (Local Development)

### 1. 의존성 설치
본 프로젝트는 **pnpm**을 사용하여 패키지를 관리합니다. 프로젝트 루트에서 아래 명령어를 실행하세요.
```bash
pnpm install
```

### 2. 환경 변수 설정
각 앱(`apps/service`, `apps/admin`) 폴더 내의 `.env.example` 파일을 참고하여 `.env` 파일을 생성하고 필요한 환경 변수를 입력합니다.
- **API 서버 주소**: `NEXT_PUBLIC_API_BASE_URL`
- **Noti API 서버 주소**: `NEXT_PUBLIC_NOTIFICATION_API_BASE_URL`

### 3. 개발 서버 실행
전체 워크스페이스를 실행하거나 특정 서비스만 선택하여 실행할 수 있습니다.
```bash
# 전체 서비스(Service + Admin) 동시 실행
pnpm dev

# 특정 서비스만 실행 (예: 일반 사용자용 서비스)
pnpm dev --filter service

# 관리자용 서비스만 실행
pnpm dev --filter admin
```


