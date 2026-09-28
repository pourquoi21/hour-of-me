import { useState } from "react";
import { DEFAULT_EMOTION_TAGS, DEFAULT_USER_SETTINGS } from "../constants/defaultData";
import { toDateString } from "../utils/date";
import { SettingsForm } from "../components/SettingsForm";
import type { UserSettings } from "../types/record";

type CycleMode = UserSettings['cycleMode'];

interface OnboardingViewProps {
    onSaveSettings: (settings: UserSettings) => void;
}

export function OnboardingView({ onSaveSettings }: OnboardingViewProps) {

    const [ targetHour, setTargetHour ] = useState(DEFAULT_USER_SETTINGS.targetHour);
    const [ cycleMode, setCycleMode ] = useState<CycleMode>('7days');

    const handleStart = () => {
        onSaveSettings({
            targetHour,
            cycleMode,
            startDate: toDateString(new Date()),
            isNotificationEnabled: true,
            palette: DEFAULT_EMOTION_TAGS,
        });
    };

    return (
        <div>
            <SettingsForm 
                targetHour={targetHour}
                setTargetHour={setTargetHour}
                cycleMode={cycleMode}
                setCycleMode={setCycleMode}
            />
            <button onClick={handleStart}>첫 조각 모으러 가기</button>
        </div>
    )
}