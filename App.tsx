import 'react-native-gesture-handler';
import './src/languages/i18n';

import { useFonts } from 'expo-font';
import * as SplashScreenExpo from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { platformSelect } from 'nativewind';
import { useCallback, useState } from 'react';
import { LogBox, Platform, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NavigationContainer } from '@react-navigation/native';

import LanguageProvider from './src/contexts/language';
import SplashScreen from './src/pages/Spashscreen';
import AuthStack from './src/stacks/auth';
import RootStack from './src/stacks/root';
import useAuth from './src/stores/auth';

LogBox.ignoreAllLogs(true);

SplashScreenExpo.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function App() {
  const [isLoading, setIsLoading] = useState(Platform.OS == "android");
  const { isAuthenticated } = useAuth();

  const [fontsLoaded] = useFonts({
    "cereal-black": require("./assets/fonts/AirbnbCereal_W_Blk.otf"),
    "cereal-bold": require("./assets/fonts/AirbnbCereal_W_Bd.otf"),
    "cereal-extra-bold": require("./assets/fonts/AirbnbCereal_W_XBd.otf"),
    "cereal-light": require("./assets/fonts/AirbnbCereal_W_Lt.otf"),
    "cereal-medium": require("./assets/fonts/AirbnbCereal_W_Md.otf"),
    "cereal-regular": require("./assets/fonts/AirbnbCereal_W_Bk.otf"),
  });

  const showSplash = platformSelect({
    ios: false,
    android: true,
    default: true,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreenExpo.hideAsync();
      if (showSplash) {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else {
        setIsLoading(false);
      }
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <View className="flex-1" onLayout={onLayoutRootView}>
            <StatusBar style="auto" />
            {isLoading ? (
              <SplashScreen />
            ) : isAuthenticated ? (
              <RootStack />
            ) : (
              <AuthStack />
            )}
            <Toast />
          </View>
        </QueryClientProvider>
      </LanguageProvider>
    </NavigationContainer>
  );
}
