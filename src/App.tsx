import './App.css'
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useRecordStorage } from './hooks/useRecordStorage';
import { OnboardingView } from './views/OnboardingView';
import { RecordView } from './views/RecordView';

function App() {
  const { isLoading, hasStoredSettings, updateSettings, settings } = useSettingsStorage();
  const { records, saveRecord, deleteRecord } = useRecordStorage(); 
  
  if (isLoading) {
    return <div>로딩 중...</div>
  }
  
  if (!hasStoredSettings) {
    return <OnboardingView onSaveSettings={updateSettings} />;
  }
  
  const todayStr = new Date().toISOString().split("T")[0];
  const todayRecord = records.find((r) => r.date === todayStr);

  return (
    <div>
      메인 화면

      {todayRecord ? (
        <div>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "15%",
              backgroundColor: todayRecord.color,
            }}
            />
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
