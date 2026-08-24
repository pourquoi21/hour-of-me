import type { EmotionTag, UserSettings } from "../types/record";

export const DEFAULT_EMOTION_TAGS: EmotionTag[] = [
    { id: 'passion', label: '열정', color: '#F87171', isDefault: true},
    { id: 'joy', label: '기쁨', color: '#FFE078', isDefault: true},
    { id: 'peace', label: '편안', color: '#6EE7B7', isDefault: true},
    { id: 'tired', label: '피곤', color: '#C4B5FD', isDefault: true},
    { id: 'anxious', label: '불안', color: '#93C5FD', isDefault: true},
    { id: 'gloomy', label: '우울', color: '#94A3B8', isDefault: true},
]