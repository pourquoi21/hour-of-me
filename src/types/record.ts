export interface EmotionTag {
    id: string; // 감정 식별자
    label: string; // 표시되는 이름
    color: string; // 색상 HEX코드
    isDefault?: boolean; // 기본 제공 태그인지 여부 (삭제 방지)
}

export interface RecordItem {
    id: string;
    date: string;
    targetHour: number; // 설정된 N시
    createdAt: string; // 실제 기록 시각 ISO
    updatedAt?: string; // 수정 시각 ISO

    // 스냅샷
    emotionId: string;
    emotionLabel: string;
    color: string;

    contentType: 'text' | 'photo' | 'video';
    note?: string;
    mediaUrl?: string; // photo/video일 때만 존재
}

export interface UserSettings {
    targetHour: number;
    cycleMode: '7days' | '30days';
    startDate: string;
    isNotificationEnabled: boolean;
    palette: EmotionTag[];
}