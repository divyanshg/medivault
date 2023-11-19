import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import Text from 'components/Text';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { View } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const NotificationAccess = () => {
  const [isAsking, setIsAsking] = React.useState(false);
  const { goBack } = useNavigation();

  const handleAllowNotifications = async () => {
    setIsAsking(true);
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === "granted") {
      await AsyncStorage.setItem("notification", "granted");
      setIsAsking(false);
      //navigate
      goBack();
    } else {
      await AsyncStorage.setItem("notification", "denied");
      setIsAsking(false);
      goBack();
    }
  };
  const handleSkip = async () => {
    await AsyncStorage.setItem("notification", "maybe-later");
    //navigate
    goBack();
  };

  return (
    <BaseView>
      <View className="flex-1 py-4">
        <View className="flex justify-center w-20 h-20">
          <FontAwesome name="bell" size={48} color="#0077B5" />
        </View>
        <View className="flex flex-col">
          <Text fontSize={42} font="cereal-bold">
            Turn on notifications?
          </Text>
          <Text fontSize={20} font="cereal-regular" className="my-4">
            Don't miss on important messages like access requests, new messages,
            and account updates.
          </Text>
          <View className="my-4">
            <Button
              variant="default"
              className="w-full bg-primary"
              isLoading={isAsking}
              onPress={handleAllowNotifications}
            >
              <Text font="cereal-bold" fontSize={16} className="text-white">
                Yes, notify me
              </Text>
            </Button>
            <Button
              variant="outline"
              className="w-full mt-4"
              onPress={handleSkip}
            >
              <Text font="cereal-bold" fontSize={16} className="text-zinc-900">
                Skip
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </BaseView>
  );
};

export default NotificationAccess;
