import { useState, useEffect, useCallback } from "react";
import { Preferences } from "@capacitor/preferences";
import type { RecordItem } from "../types/record";

const RECORDS_KEY = 'records';

export function useRecordStorage() {
    const [records, setRecords] = useState<RecordItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { value } = await Preferences.get({ key: RECORDS_KEY });
                if (value) {
                    setRecords(JSON.parse(value) as RecordItem[]);
                }
            } catch (e) {
                console.error('기록 불러오기 실패:', e);
            } finally {
                setIsLoading(false);
            }  
        })();
    }, []);

    // records 바뀔때마다 저장
    useEffect(() => {
        if (isLoading) return;
        Preferences.set({ key: RECORDS_KEY, value: JSON.stringify(records) });
    }, [records, isLoading]);

    const saveRecord = useCallback((record: RecordItem) => {
        setRecords((prev) => {
            const exists = prev.some((r) => r.id === record.id);
            return exists
                ? prev.map((r) => (r.id === record.id ? { ...record, updatedAt: new Date().toISOString() } : r))
                : [...prev, record];
        });
    }, []);

    const deleteRecord = useCallback((id: string) => {
        setRecords((prev) => prev.filter((r) => r.id !== id));
    }, []);

    const getRecordsByDate = useCallback(
        (date: string) => records.filter((r) => r.date === date),
        [records]
    );

    return { records, isLoading, saveRecord, deleteRecord, getRecordsByDate };
}