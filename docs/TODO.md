# 개발 로드맵 & 메모

## 다음 목표
- [ ] **로컬 알림 기능 검증 및 개선 (@capacitor/local-notifications)**
  - [x] 기존 예약 목록 조회 (`getPending`)
  - [x] 기존 알림 취소 함수 구현 및 동작 확인 (`cancel`)
  - [ ] 설정 저장 시 기존 알림 취소 후 재예약 (중복 방지)
  - [x] 설정 저장 시 알림 예약 실패 처리 (`try/catch`)
  - [ ] 알림 권한 거부 시 동작 확인
  - [ ] 에뮬레이터에서 매일 targetHour 반복 알림 동작 검증
  - [ ] 알림 비활성화 시 기존 예약 취소 처리


## 추후 개선 과제
- [ ] **다양한 감정 팔레트 테마 지원**
  - 비비드, 파스텔, 네온, 뉴트럴 등
  - 커스텀 팔레트 도입 시 온보딩 단계에서 설정 스텝 추가 검토
- [ ] **기록 수정 기능 고도화**
  - `Partial<RecordItem>` 타입을 활용한 안전한 부분 업데이트 구현
- [ ] **사진/영상 기록 (@capacitor/camera)**

## 완료
- [x] **로컬 알림 (@capacitor/local-notifications)**
  - 설정 저장 시 매일 targetHour에 알림 예약
  - 알림 예약 수정 및 취소 처리
- [x] **월 단위 뷰: 이전/다음달 이동**
  - ArchiveView의 year/month를 버튼으로 증감
- [x] **Android 개발 환경 구축, 로컬 알림 테스트**
  - Android Studio, Android SDK, JDK는 21로 설정(Gradle 버전 8.14.3)
  - Pixel 10 에뮬레이터에서 앱 빌드 & 실행
  - @capacitor/local-notifications 이용 1분후 알림 예약 테스트
- [x] **월 단위 달력 뷰 (ArchiveView)**
  - getMonthCells로 7열 그리드 렌더링, records의 date 매칭으로 감정 색상 표시, 선택 시 상세 카드 연동
- [x] **월 달력용 날짜 셀 생성 유틸 (getMonthCells)**
  - 1일의 요일만큼 앞을 null로 채워 일~토 열에 맞춤
- [x] **상세 카드 감정 뱃지에 감정 색상 적용 (record.color 스냅샷 사용)**
- [x] **30일 그리드 환경 대응**
  - 30일 모드는 6열×5줄로 표시, 툴팁 대신 클릭 시 하단 상세 카드(EmotionDetailCard)로 전환
- [x] **시간대별 안내 문구 (RecordView)**
  - 현재 시각이 N시 전후인지, 새벽인지 등에 따라 문구를 다르게 표시
- [x] **사이클 종료 시 새 사이클 시작 화면 (CycleCompleteView)**
  - 날짜 문자열 대소 비교로 종료 판별 (밀리초 나눗셈은 오차 위험)
- [x] **사이클 종료일 계산 유틸 분리 (getCycleEndDate)**
- [x] **Onboarding / CycleComplete 공통 설정 폼 분리 (SettingsForm)**
- [x] **App.tsx 화면 정리**
  - 상단 그리드에 시각화가 되므로 하단 오늘 기록 완료 카드의 중복 UI 정리
- [x] **부모-자식 간 함수/인자 전달 복습 (Callback Props, state 위치 판단)**