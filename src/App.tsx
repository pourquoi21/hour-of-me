import './App.css'
import { useState } from 'react';
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useRecordStorage } from './hooks/useRecordStorage';
import { OnboardingView } from './views/OnboardingView';
import { RecordView } from './views/RecordView';
import { toDateString, getCycleEndDate } from './utils/date';
import { GridView } from './views/GridView';
import { getCycleDays } from './utils/dateGrid';
import { CycleCompleteView } from './views/CycleCompleteView';
import { EmotionDetailCard } from './components/EmotionDetailCard';

function App() {
  const { isLoading, hasStoredSettings, updateSettings, settings } = useSettingsStorage();
  const { records, saveRecord, deleteRecord } = useRecordStorage(); 
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const selectedRecord = selectedDate ? records.find((r) => r.date === selectedDate) : null;

  const todayStr = toDateString(new Date());
  const todayRecord = records.find((r) => r.date === todayStr);
  const cycleDays = settings.cycleMode === '30days' ? 30 : 7;
  const cycleEndDate = settings.startDate ? getCycleEndDate(settings.startDate, cycleDays) : null;
  const isCycleEnded = Boolean(cycleEndDate && cycleEndDate < todayStr);
  
  function handleSelectDate(dateStr: string): void {
    setSelectedDate((prev) => prev === dateStr ? null : dateStr);
  }

  if (isLoading) {
    return <div>로딩 중...</div>
  }
  
  if (!hasStoredSettings) {
    return <OnboardingView onSaveSettings={updateSettings} />;
  }

  if (isCycleEnded) {
    return (
      <CycleCompleteView
        currentSettings={settings}
        records={records}
        onStartNewCycle={updateSettings}
      />
    )
  }
  
  return (
    <div>
      메인 화면
      <GridView
        startDate={settings.startDate}
        onSelectDate={handleSelectDate}
        records={records}
        cycleMode={settings.cycleMode || '7days'}
      />
      {selectedDate &&
        <EmotionDetailCard 
          record={selectedRecord}
        />
        }

      {todayRecord ? (
        <div>
            <h3>{todayRecord.emotionLabel}</h3>
            {todayRecord.note && (
              <p
                style={{
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                "{todayRecord.note}"
              </p>
            )}
            <button
              type="button"
              onClick={() => deleteRecord(todayRecord.id)}
            >
              다시쓰기
            </button>
        </div>
      ) : (
        <RecordView
          onSaveRecord={saveRecord}
          targetHour={settings.targetHour} />
      )}
    </div>
  );
}

export default App
