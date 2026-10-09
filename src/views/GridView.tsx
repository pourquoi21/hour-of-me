import { useState } from "react";
import { getCycleDays } from "../utils/dateGrid";
import type { RecordItem, UserSettings } from "../types/record";

interface GridViewProps {
    startDate: string;
    onSelectDate?: (dateStr: string) => void;
    records: RecordItem[];
    cycleMode?: UserSettings['cycleMode'];
}

export function GridView({
    startDate,
    records,
    onSelectDate,
    cycleMode = '7days',
}: GridViewProps) {
    const cycleDays = cycleMode === '30days' ? 30 : 7;
    const days = getCycleDays(startDate, cycleDays);

    return (
        <div style={{ marginTop: 24 }}>
            <h3
                style={{ marginBottom: 12, fontSize: 16 }}
            >
                {cycleDays}일간의 감정 조각</h3>
            <div
            style={{
                display: "grid",
                gridTemplateColumns: cycleDays === 30 ? "repeat(6, 1fr)" : "repeat(7, 1fr)",
                gap: 8,
            }}
            >
                {days.map((dateStr) => {
                    const matchedRecord = records.find((r) => r.date === dateStr);
                    const displayDate = dateStr.slice(5);

                    return (
                        <div
                            key={dateStr}
                            onClick={() => onSelectDate?.(dateStr)}
                            style={{
                                position: "relative",
                                display: "flex",
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
                        </div>
                    )
                })}
            </div>
        </div>
    )
}