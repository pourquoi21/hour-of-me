import { useState } from "react";
import type { RecordItem, EmotionTag } from "../types/record";
import { DEFAULT_EMOTION_TAGS } from "../constants/defaultData";
import { toDateString } from "../utils/date";

interface RecordViewProps {
    onSaveRecord: (record: RecordItem) => void;
    targetHour: number;
}

export function getTimeBasedGreetingMessage(targetHour: number) {
    const currentHour = new Date().getHours();

    if (currentHour === targetHour) {
        return `약속한 ${targetHour}시예요. 같이 조각을 모아볼까요?`;
    }

    if (currentHour < targetHour) {
        return `오늘 하루도 잘 흘러가고 있나요? ${targetHour}시에 만나요.`;
    }

    return `바쁜 하루였나요? 지나간 조각이라도 괜찮아요. 같이 모아봐요.`;
}


export function RecordView({ onSaveRecord, targetHour }: RecordViewProps) {
    const [selectedTag, setSelectedTag] = useState<EmotionTag>(DEFAULT_EMOTION_TAGS[0]);
    const [note, setNote] = useState("");

    const handleSave = () => {
        const today = toDateString(new Date());

        const record: RecordItem = {
            id: `${today}_${targetHour}`,
            date: today,
            targetHour,
            createdAt: new Date().toISOString(),
            emotionId: selectedTag.id,
            emotionLabel: selectedTag.label,
            color: selectedTag.color,
            contentType: 'text',
            note,
        }
        onSaveRecord(record);
        console.log("saved");
    }

    return (
        <div>
            <h2>오늘의 감정</h2>
            <p>{getTimeBasedGreetingMessage(targetHour)}</p>
            {DEFAULT_EMOTION_TAGS.map((t) => {
              const isSelected = selectedTag.id === t.id;
              
              return (
                <button
                    type="button"
                    key={t.id}
                    onClick={() => setSelectedTag(t)}
                    style={{
                        border: 0,
                        borderRadius: "5px",
                        backgroundColor: t.color,
                        fontWeight: isSelected ? "bold" : "normal",
                    }}
                >
                    {t.label}
                </button>
              );
            })}
            <p>선택된 태그: {selectedTag.label}</p>
            <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="한 줄 메모를 남겨보세요"
            />

            <button
                type="button"
                onClick={handleSave}
            >
                기록 남기기
            </button>
        </div>
    );

}