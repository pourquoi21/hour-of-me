import type { UserSettings } from "../types/record";

type CycleMode = UserSettings['cycleMode'];

interface SettingsFormProps {
    targetHour: number;
    setTargetHour: (h: number) => void;
    cycleMode: CycleMode;
    setCycleMode: (m: CycleMode) => void;
}

export function SettingsForm({targetHour, setTargetHour, cycleMode, setCycleMode}: SettingsFormProps) {
    return (
        <>
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
        </>
    )
}