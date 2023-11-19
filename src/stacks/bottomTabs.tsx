import { useTranslation } from 'react-i18next';

import { Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../pages/Home';
import Profile from '../pages/Profile';

const Tab = createBottomTabNavigator();

function HomeStack() {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#00A8E8",
      }}
    >
      <Tab.Screen
        name="records"
        options={{
          title: t`My Records`,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="documents" size={size} color={color} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="consents"
        options={{
          title: t`Consent Requests`,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5 name="notes-medical" size={size} color={color} />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="profile"
        options={{
          title: t`Profile`,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

export default HomeStack;
