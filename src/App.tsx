import './App.css'
import { useState } from 'react';
import { useSettingsStorage } from "./hooks/useSettingsStorage";
import { OnboardingView } from './views/OnboardingView';

function App() {
  const { isLoading, hasStoredSettings } = useSettingsStorage();
  const [justOnboarded, setJustOnboarded] = useState(false);
  
  if (isLoading) {
    return <div>로딩 중...</div>
  }
  
  if (!hasStoredSettings && !justOnboarded) {
    return <OnboardingView onComplete={() => setJustOnboarded(true)} />;
  }

  return (
    <div>
      메인 화면
    </div>
  );
}

export default App
