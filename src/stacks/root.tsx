import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LocalAuth from '../contexts/localAuth';
import AddRecord from '../pages/AddRecord';
import ChooseRecords from '../pages/ChooseRecords';
import NotificationAccess from '../pages/NotificationAccess';
import Record from '../pages/Record';
import RecordView from '../pages/Record/RecordView';
import Scanner from '../pages/Scanner';
import HomeDrawer from './drawer';

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocalAuth>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="home"
        >
          <Stack.Screen name="home" component={HomeDrawer} />
          <Stack.Screen name="add-record" component={AddRecord} />
          <Stack.Screen name="scanner" component={Scanner} />
          <Stack.Screen name="record" component={Record} />
          <Stack.Screen name="record-view" component={RecordView} />
          <Stack.Screen name="choose-records" component={ChooseRecords} />
          <Stack.Screen
            name="notification-access"
            component={NotificationAccess}
          />
        </Stack.Navigator>
      </LocalAuth>
    </GestureHandlerRootView>
  );
};

export default RootStack;
