import type { EmotionTag, UserSettings } from "../types/record";
import { toDateString } from "../utils/date";

export const DEFAULT_EMOTION_TAGS: EmotionTag[] = [
    { id: 'passion', label: '열정', color: '#FF96BA', isDefault: true},
    { id: 'joy', label: '기쁨', color: '#FDE68A', isDefault: true},
    { id: 'peace', label: '편안', color: '#A2E1DB', isDefault: true},
    { id: 'tired', label: '피곤', color: '#CBAACB', isDefault: true},
    { id: 'anxious', label: '불안', color: '#7BA4D9', isDefault: true},
    { id: 'gloomy', label: '우울', color: '#7A8B99', isDefault: true},
]

export const PRESET_COLOR_PALETTE: string[] = [
  '#FF96BA',
  '#FDE68A',
  '#A2E1DB',
  '#CBAACB',
  '#7BA4D9',
  '#7A8B99',
  '#FBCFE8',
  '#FED7AA',
  '#CBD5E1',
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
    targetHour: 15,
    cycleMode: '7days',
    startDate: toDateString(new Date()),
    isNotificationEnabled: true,
    palette: DEFAULT_EMOTION_TAGS,
}