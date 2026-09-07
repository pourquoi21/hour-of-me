import { useState } from "react";
import { useSettingsStorage } from "../hooks/useSettingsStorage";
import { DEFAULT_EMOTION_TAGS, DEFAULT_USER_SETTINGS } from "../constants/defaultData";
import type { UserSettings } from "../types/record";

type CycleMode = UserSettings['cycleMode'];

interface OnboardingViewProps {
    onComplete: () => void;
}

export function OnboardingView({ onComplete }: OnboardingViewProps) {
    const { updateSettings } = useSettingsStorage();

    const [ targetHour, setTargetHour ] = useState(DEFAULT_USER_SETTINGS.targetHour);
    const [ cycleMode, setCycleMode ] = useState<CycleMode>('7days');

    const handleStart = () => {
        updateSettings({
            targetHour,
            cycleMode,
            startDate: new Date().toISOString().split('T')[0],
            isNotificationEnabled: true,
            palette: DEFAULT_EMOTION_TAGS,
        });
        onComplete();
    };

    return (
        <div>
            <h1>하루 중 가장 나다운 N시를 골라주세요</h1>
            <select
                name="targetHour"
                value={targetHour}
                onChange={(e) => setTargetHour(Number(e.target.value))}
            >
                {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i}시</option>
                ))}
            </select>
            <fieldset>
                <legend>기록 주기를 선택해주세요.</legend>
                <input type="radio"
                id="7days"
                name="cycleMode"
                value="7days"
                checked={cycleMode === "7days"}
                onChange={(e) => setCycleMode(e.target.value as CycleMode)}
                />
                <label htmlFor="7days">
                    가볍게 일주일
                </label>
                <input type="radio"
                    id="30days"
                    name="cycleMode"
                    value="30days"
                    checked={cycleMode === "30days"}
                    onChange={(e) => setCycleMode(e.target.value as CycleMode)}
                />
                <label htmlFor="30days">
                    한달 도전
                </label>
            </fieldset>
            <button onClick={handleStart}>시작하기</button>
        </div>
    )
}