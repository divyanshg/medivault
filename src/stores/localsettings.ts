import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SettingsStore {
  theme: "light" | "dark";
  toggleTheme: () => void;
  language: "en" | "hi";
  toggleLanguage: () => void;
  setLanguage: (lang: "en" | "hi") => void;
  isFirstStart: boolean;
  setFirstStart: () => void;
  isBiometricEnabled: boolean;
  toggleBiometric: () => void;
  isPinSet: boolean;
  togglePin: () => void;
}

const SettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: "light",
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      language: "en",
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "en" ? "hi" : "en" })),
      setLanguage: (lang) => set({ language: lang }),
      isFirstStart: true,
      setFirstStart: () => set({ isFirstStart: false }),
      isBiometricEnabled: false,
      toggleBiometric: () =>
        set((state) => ({ isBiometricEnabled: !state.isBiometricEnabled })),
      isPinSet: false,
      togglePin: () => set((state) => ({ isPinSet: !state.isPinSet })),
    }),
    { name: "settings-storage", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const toggleTheme = SettingsStore.getState().toggleTheme;
export const toggleLanguage = SettingsStore.getState().toggleLanguage;
export const setLanguage = SettingsStore.getState().setLanguage;
export const setFirstStart = SettingsStore.getState().setFirstStart;
export const toggleBiometric = SettingsStore.getState().toggleBiometric;
export const togglePin = SettingsStore.getState().togglePin;

const useSettings = () => SettingsStore((state: SettingsStore) => state);

export default useSettings;
