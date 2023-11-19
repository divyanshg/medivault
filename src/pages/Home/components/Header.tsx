import React from 'react';
import { Platform, Pressable, Share, View } from 'react-native';

import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = ({ navigation }: { navigation: any }) => {
  const { navigate } = useNavigation();
  const shareIcon = Platform.select({
    ios: "share",
    android: "share-2",
    default: "share",
  }) as keyof typeof Feather.glyphMap;

  function handleScanPress() {
    navigate("scanner" as never);
  }

  async function handleSharePress() {
    const url = Platform.select({
      android:
        "https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US",
      ios: "https://apps.apple.com/in/app/instagram/id389801252",
    });

    try {
      await Share.share({
        message: `Try out the Medivault Mobile app \n  ${url} \n It's an amazing application to view your medical records and share them with your doctors. \n I am using it and I think you should too.`,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <View className="flex flex-row items-center justify-between mb-2">
      <View>
        <Pressable
          className="p-1 rounded-full"
          onPress={() => navigation.openDrawer()}
        >
          <Feather name="menu" size={28} color="black" />
        </Pressable>
      </View>
      <View className="flex flex-row items-center space-x-4">
        <Pressable className="p-1 rounded-full" onPress={handleScanPress}>
          <MaterialCommunityIcons name="qrcode-scan" size={28} color="black" />
        </Pressable>
        <Pressable className="p-1 rounded-full" onPress={handleSharePress}>
          <Feather name={shareIcon} size={28} color="black" />
        </Pressable>
        <Pressable className="p-1 rounded-full">
          <Feather name="bell" size={28} color="black" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
