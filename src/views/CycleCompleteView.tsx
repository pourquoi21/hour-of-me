import { useState } from "react";
import type { RecordItem, UserSettings } from "../types/record";
import { DEFAULT_USER_SETTINGS } from "../constants/defaultData";
import { toDateString } from "../utils/date";
import { GridView } from "./GridView";
import { SettingsForm } from "../components/SettingsForm";

type CycleMode = UserSettings['cycleMode'];

interface CycleCompleteViewProps {
    currentSettings: UserSettings;
    records: RecordItem[];
    onStartNewCycle: (newSettings: UserSettings) => void;
}

export function CycleCompleteView({ currentSettings, records, onStartNewCycle }: CycleCompleteViewProps) {
    const [targetHour, setTargetHour] = useState(DEFAULT_USER_SETTINGS.targetHour);
    const [cycleMode, setCycleMode] = useState<CycleMode>(currentSettings.cycleMode);
    const cycleDays = currentSettings.cycleMode === '30days' ? 30 : 7;

    const handleStart = () => {
        onStartNewCycle({
            ...currentSettings,
            targetHour,
            cycleMode,
            startDate: toDateString(new Date()),
        })
    }

    return (
        <div>
            <h1>🎉{cycleDays}일의 감정 조각을 모두 모았어요!🎉</h1>
            <p>내가 완성한 일주일의 모습이에요.</p>
            <GridView
                startDate={currentSettings.startDate}
                records={records}
                cycleMode={currentSettings.cycleMode}
            />

            <SettingsForm 
                targetHour={targetHour}
                setTargetHour={setTargetHour}
                cycleMode={cycleMode}
                setCycleMode={setCycleMode}
            />
            <button onClick={handleStart}>다음 조각 모으러 가기</button>
        </div>
    )

}