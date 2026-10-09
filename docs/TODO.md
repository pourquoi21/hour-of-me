# 개발 로드맵 & 메모

## 다음 목표
- [ ] **로컬 알림 (@capacitor/local-notifications)**
  - 설정 저장 시 매일 targetHour에 알림 예약
  - 에뮬레이터/실기기 테스트를 위해 Android Studio 설치 필요
- [ ] **월 단위 달력 뷰 (과거 기록 아카이브)**
  - records의 date 기반으로 월별 그리드 조회, 요일 열에 맞춰 정렬

## 추후 개선 과제
- [ ] **다양한 감정 팔레트 테마 지원**
  - 비비드, 파스텔, 네온, 뉴트럴 등
  - 커스텀 팔레트 도입 시 온보딩 단계에서 설정 스텝 추가 검토
- [ ] **기록 수정 기능 고도화**
  - `Partial<RecordItem>` 타입을 활용한 안전한 부분 업데이트 구현
- [ ] **사진/영상 기록 (@capacitor/camera)**

## 완료
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