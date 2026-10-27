import { getMonthCells, changeMonth } from "../utils/date";
import { useState } from "react";
import type { RecordItem } from "../types/record";


interface ArchiveViewProps {
    records: RecordItem[];
    onSelectDate: (dateStr: string) => void;
    selectedDate: string | null;
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

export function ArchiveView({
    records,
    onSelectDate,
    selectedDate
}: ArchiveViewProps) {
    const [viewDate, setViewDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth()
    });
    const cells = getMonthCells(viewDate.year, viewDate.month);

    const handleChangeMonth = (offset: number) => {
        setViewDate(prev => changeMonth(prev.year, prev.month, offset));
    }

    return (
        <>
            <div>
                <div
                    style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#888',
                    fontSize: '12px',
                    marginBottom: '8px',
                    }}
                >
                    {WEEKDAYS.map((day) => (
                    <div key={day}>{day}</div>
                    ))}
                </div>
            </div>
            <div
                style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: '8px',
                }}
            >
                {cells.map((dateStr, index) => {
                    if (!dateStr) {
                        return <div key={`empty-${index}`} style={{ height: '44px' }} />;
                    }
                    
                    const record = records.find((r) => r.date === dateStr);
                    const dayNumber = Number(dateStr.slice(8));
                    const isSelected = selectedDate === dateStr;

                    return (
                        <div
                            key={dateStr}
                            onClick={() => onSelectDate(dateStr)}
                            style={{
                                height: '44px',
                                borderRadius: '8px',
                                border: isSelected ? '2px solid #333' : '1px solid #eee',
                                backgroundColor: record ? record.color : '#fafafa',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '13px',
                                boxSizing: "border-box",
                                cursor: 'pointer',
                            }}
                        >
                            {dayNumber}
                        </div>
                    )
                })}
                <div>
                    <button onClick={() => handleChangeMonth(-1)}>이전</button>
                    <button onClick={() => handleChangeMonth(1)}>다음</button>
                </div>
            </div>
        </>
    );
}