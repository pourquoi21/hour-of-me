import './App.css'
import { useState } from 'react';
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { OnboardingView } from './views/OnboardingView';

function App() {
  const { isLoading, hasStoredSettings, updateSettings } = useSettingsStorage();
  
  if (isLoading) {
    return <div>로딩 중...</div>
  }
  
  if (!hasStoredSettings) {
    return <OnboardingView onSaveSettings={updateSettings} />;
  }

  return (
    <div>
      메인 화면
    </div>
  );
}

export default App
