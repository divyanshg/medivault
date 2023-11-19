import React from 'react';
import { useTranslation } from 'react-i18next';

import { Feather, Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import ChangeLanguage from '../pages/ChangeLanguage';
import SelfQR from '../pages/SelfQR';
import HomeStack from './bottomTabs';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  const { t } = useTranslation();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#00A8E8",
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: t("Home"),
          drawerIcon: ({ focused, color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
        component={HomeStack}
      />
      <Drawer.Screen
        name="change-language"
        options={{
          title: t("Change Language"),
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="language" size={size} color={color} />
          ),
        }}
        component={ChangeLanguage}
      />
      <Drawer.Screen
        name="self-qr"
        options={{
          title: t("Self QR"),
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name="qr-code-sharp" size={size} color={color} />
          ),
        }}
        component={SelfQR}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
