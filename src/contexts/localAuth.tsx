import * as LocalAuthentication from 'expo-local-authentication';
import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import LocalAuthenticate from '../pages/LocalAuthenticate';
import useSettings from '../stores/localsettings';

const LocalAuthContext = createContext({});

const LocalAuth = ({ children }: { children: React.ReactNode }) => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useTranslation();
  const { isBiometricEnabled, isFirstStart, isPinSet } = useSettings();

  // Check if hardware supports biometrics
  useEffect(() => {
    const checkSupport = async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      if (compatible) handleBiometricAuth();
    };

    if (isBiometricEnabled && !isFirstStart && isPinSet) checkSupport();
  }, [isBiometricEnabled, isFirstStart, isPinSet]);

  const handleBiometricAuth = useCallback(async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics)
      return Toast.show({
        type: "error",
        text1: "No biometrics saved",
        text2: "Please add a fingerprint or face scan to your device",
      });

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: t`Unlock Medivault`,
    });

    if (biometricAuth.success) setIsAuthenticated(true);
  }, []);

  const handlePinAuth = useCallback(async () => {
    setIsAuthenticated((prevState) => !prevState);
    console.log("PIN AUTH");
  }, []);

  return (
    <LocalAuthContext.Provider value={{}}>
      {isAuthenticated || !isBiometricEnabled || isFirstStart || !isPinSet ? (
        children
      ) : (
        <LocalAuthenticate
          successCallback={handlePinAuth}
          biometricAuth={isBiometricSupported ? handleBiometricAuth : undefined}
        />
      )}
    </LocalAuthContext.Provider>
  );
};

export default LocalAuth;
