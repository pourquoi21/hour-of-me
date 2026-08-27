import { useState, useEffect, useCallback } from 'react';
import { Preferences } from '@capacitor/preferences';
import type { UserSettings } from '../types/record';
import { DEFAULT_USER_SETTINGS } from '../constants/defaultData';

const SETTINGS_KEY = 'settings';

export function useSettingsStorage() {
    const [settings, setSettings] = useState<UserSettings>(DEFAULT_USER_SETTINGS);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const { value } = await Preferences.get({ key: SETTINGS_KEY });
                if (value) {
                    setSettings(JSON.parse(value) as UserSettings);
                }
            } catch (e) {
                console.error('설정 불러오기 실패:', e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    const updateSettings = useCallback(async (newSettings: UserSettings) => {
        setSettings(newSettings);
        await Preferences.set({
            key: SETTINGS_KEY,
            value: JSON.stringify(newSettings),
        });
    }, []);

    return { settings, isLoading, updateSettings };
}