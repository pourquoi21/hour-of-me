import { useState } from "react";
import type { RecordItem, UserSettings } from "../types/record";
import { DEFAULT_USER_SETTINGS } from "../constants/defaultData";
import { toDateString } from "../utils/date";
import { GridView } from "./GridView";

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

            <h2>하루 중 가장 나다운 N시를 골라주세요</h2>
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