import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import Text from 'components/Text';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Header from './components/Header';
import Records from './components/Records';
import User from './components/User';

const Home = ({ navigation }: { navigation: any }) => {
  const { navigate } = useNavigation();

  useEffect(() => {
    const checkIfPermissionGranted = async () => {
      if (Device.isDevice) {
        const { status } = await Notifications.getPermissionsAsync();
        if (status !== "granted") {
          navigate("notification-access" as never);
        }
      }
    };

    if (!__DEV__) checkIfPermissionGranted();
  }, []);

  function handleAddRecords() {
    // bottomSheetRef.current?.snapToIndex(0);
    // setShowBackdrop(true);
    navigate("add-record" as never);
  }

  return (
    <>
      <BaseView>
        <Header navigation={navigation} />
        <User />
        <Records />
        <Button
          className="absolute flex flex-row items-center justify-center w-full space-x-4 bottom-8 left-6 ios:left-7 bg-primary"
          onPress={handleAddRecords}
        >
          <Feather name="upload" size={28} color="white" />
          <Text className="text-white" font="cereal-bold">
            Add Records
          </Text>
        </Button>
      </BaseView>
    </>
  );
};

export default Home;
