import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../languages/i18n';
import { ChangeComponent } from '../pages/ChangeLanguage';
import useSettings, { setLanguage, SettingsStore } from '../stores/localsettings';

interface LanguageProviderProps {
  children: React.ReactNode;
}

const LanguageContext = createContext<{
  language: string;
  setLanguage: (language: "hi" | "en", save: boolean) => void;
  availableLanguages: {
    id: string;
    label: string;
    value: string;
  }[];
}>({
  language: "en",
  setLanguage: (language, save) => {},
  availableLanguages: [],
});

const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [isLanguageSaved, setIsLanguageSaved] = useState<boolean>(false); // [1
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const { t } = useTranslation();
  const { language } = useSettings();

  const handleChange = useCallback(
    (language: "hi" | "en", save: boolean = true) => {
      i18n.changeLanguage(language);

      if (save) {
        setLanguage(language);
        Toast.show({
          type: "success",
          text1: t`Language changed`,
          text2: t(`Language changed to`, {
            language: language === "en" ? "English" : "हिन्दी",
          }),
        });
      }
    },
    []
  );

  useEffect(() => {
    i18n.changeLanguage(language);
  }, []);

  const availableLanguages = useMemo(
    () => [
      {
        id: "en",
        label: "English",
        value: "en",
      },
      {
        id: "hi",
        label: "हिन्दी",
        value: "hi",
      },
    ],
    []
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleChange,
        availableLanguages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

export default LanguageProvider;
