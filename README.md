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

## 어드민
### 주요 기능

### 

<img width="697" height="927" alt="스크린샷 2026-03-19 오후 11 25 59" src="https://github.com/user-attachments/assets/8318e818-7bed-474f-9386-718fd9b4d923" />
<img width="697" height="927" alt="스크린샷 2026-03-19 오후 11 25 37" src="https://github.com/user-attachments/assets/69127a74-a6c7-4279-b1ee-1397021550b4" />
<img width="697" height="927" alt="스크린샷 2026-03-19 오후 11 25 35" src="https://github.com/user-attachments/assets/047d716a-7cd9-4870-91ad-f9f0b5402c53" />
<img width="697" height="927" alt="스크린샷 2026-03-19 오후 11 25 26" src="https://github.com/user-attachments/assets/e2d2d9a2-e753-4d4f-a282-7048526e732a" />
<img width="1917" height="927" alt="스크린샷 2026-03-19 오후 11 25 16" src="https://github.com/user-attachments/assets/5ba9a56a-1540-4df7-81c9-0c217a5314c5" />
<img width="1917" height="927" alt="스크린샷 2026-03-19 오후 11 25 11" src="https://github.com/user-attachments/assets/c691a37b-8ec4-4665-a557-a8d7808e02eb" />
<img width="1917" height="927" alt="스크린샷 2026-03-19 오후 11 24 52" src="https://github.com/user-attachments/assets/9376d074-9a97-4283-9d88-ba4d8bf8c705" />
<img width="1917" height="927" alt="스크린샷 2026-03-19 오후 11 23 57" src="https://github.com/user-attachments/assets/b99f416b-ffd7-4daa-862d-4023f04d98c8" />
<img width="1917" height="927" alt="스크린샷 2026-03-19 오후 11 23 36" src="https://github.com/user-attachments/assets/b864caa7-dbaf-4a6f-b91c-e1df2606ed6d" />
<img width="1920" height="1080" alt="스크린샷 2026-03-19 오후 11 23 12(2)" src="https://github.com/user-attachments/assets/fb7425d8-5a3b-46c1-ab89-ef05fbe75359" />



