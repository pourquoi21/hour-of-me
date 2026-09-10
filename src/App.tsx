import './App.css'
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { useRecordStorage } from './hooks/useRecordStorage';
import { OnboardingView } from './views/OnboardingView';
import { RecordView } from './views/RecordView';

function App() {
  const { isLoading, hasStoredSettings, updateSettings, settings } = useSettingsStorage();
  const { saveRecord } = useRecordStorage(); 
  
  if (isLoading) {
    return <div>로딩 중...</div>
  }
  
  if (!hasStoredSettings) {
    return <OnboardingView onSaveSettings={updateSettings} />;
  }

  return (
    <div>
      메인 화면
      <RecordView
        onSaveRecord={saveRecord}
        targetHour={settings.targetHour} />
    </div>
  );
}

export default App
