import { useState } from "react";
import { getCycleDays } from "../utils/dateGrid";
import type { RecordItem, UserSettings } from "../types/record";

interface GridViewProps {
    startDate: string;
    records: RecordItem[];
    cycleMode?: UserSettings['cycleMode'];
}

export function GridView({
    startDate,
    records,
    cycleMode = '7days',
}: GridViewProps) {
    const [activeTooltipDate, setActiveTooltipDate] = useState<string | null>(null);
    const totalDays = cycleMode === '30days' ? 30 : 7;
    const days = getCycleDays(startDate, totalDays);

    return (
        <div style={{ marginTop: 24 }}>
            <h3
                style={{ marginBottom: 12, fontSize: 16 }}
            >
                {totalDays}일간의 감정 조각</h3>
            <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
            }}
            >
                {days.map((dateStr) => {
                    const matchedRecord = records.find((r) => r.date === dateStr);
                    const displayDate = dateStr.slice(5);
                    const isTooltipOpen = activeTooltipDate === dateStr;

                    const handleTileClick = () => {
                        if (!matchedRecord) return;
                        setActiveTooltipDate(isTooltipOpen ? null : dateStr);
                    }

                    return (
                        <div
                            key={dateStr}
                            onClick={handleTileClick}
                            style={{
                                display: "flex",
                                position: "relative",
                                flexDirection: "column",
                                alignItems: "center",
                                padding: "8px 4px",
                                borderRadius: 8,
                                backgroundColor: matchedRecord ? matchedRecord.color : "#f1f3f5",
                                border: matchedRecord ? "none" : "1px dashed #ced4da",
                                color: matchedRecord ? "#fff" : "#868e96",
                                cursor: matchedRecord ? "pointer" : "default",
                                minHeight: 70,
                                justifyContent: "space-between",
                                boxSizing: "border-box",
                                transition: "transform 0.1s ease",
                            }}
                        >
                            <span>
                                {matchedRecord ? matchedRecord.emotionLabel : ""}
                            </span>
                            <span style={{ fontSize: 9, opacity: 0.85 }}>
                                {displayDate}
                            </span>

                            {isTooltipOpen && matchedRecord && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "calc(100% + 8px)",
                                        transform: "translateX(-50%)",
                                        backgroundColor: "#333",
                                        color: "#fff",
                                        padding: "8px 12px",
                                        borderRadius: 6,
                                        fontSize: 12,
                                        whiteSpace: "normal",
                                        width: 140,
                                        textAlign: "center",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                                        zIndex: 10,
                                    }}
                                >
                                    <div style={{ fontWeight: "bold", marginBottom: 4, color: matchedRecord.color }}>
                                        {matchedRecord.emotionLabel}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#eee", wordBreak: "break-word" }}>
                                        {matchedRecord.note ? `"${matchedRecord.note}"` : "메모 없음"}
                                    </div>

                                    {/* 말풍선 꼬리표 */}
                                    <div
                                        style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: 0,
                                        height: 0,
                                        borderLeft: "5px solid transparent",
                                        borderRight: "5px solid transparent",
                                        borderTop: "5px solid #333",
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}