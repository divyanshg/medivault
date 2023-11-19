import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import SceneHeader from 'components/SceneHeader';
import Text from 'components/Text';
import React from 'react';
import { Image, Share, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import useAuth from 'stores/auth';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SelfQR = () => {
  let logoFromFile = require("../../../assets/icon.png");
  const { user } = useAuth();
  const { navigate } = useNavigation();

  if (!user) return null;

  function openScanner() {
    navigate("scanner" as never);
  }

  function shareQR() {
    Share.share({
      message: "https://google.com",
    });
  }

  return (
    <BaseView>
      <SceneHeader
        heading="Self QR"
        subHeadingComponent={
          <Text>
            Show this QR code to the doctor and let them access your records
          </Text>
        }
      />
      <View className="flex flex-col py-6 space-y-4">
        <View className="flex flex-col items-center justify-center p-4 space-y-2 bg-gray-200 rounded-xl">
          {/* <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/QR_Code_Model_1_Example.svg/1200px-QR_Code_Model_1_Example.svg.png",
            }}
            style={{
              width: 200,
              height: 200,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          /> */}
          <View
            style={{
              width: 200,
              height: 200,
              backgroundColor: "white",
              borderRadius: 10,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <QRCode value={user?.vaultAddress} logo={logoFromFile} size={150} />
          </View>
          <View className="flex flex-col items-center justify-center space-y-3">
            <View>
              <Text disableTranslate font="cereal-medium" fontSize={24}>
                {user?.firstName} {user?.lastName}
              </Text>
            </View>
            <View>
              <Text>{user?.vaultAddress}</Text>
            </View>
            <View>
              <Button className="bg-primary" onPress={shareQR}>
                <View className="flex flex-row items-center justify-center w-full ">
                  <Text className="text-white" font="cereal-medium">
                    Share
                  </Text>
                </View>
              </Button>
            </View>
          </View>
        </View>
        <Button variant="ghost" onPress={openScanner}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={28}
            color="#00A8E8"
          />
          <View className="ml-2">
            <Text className="text-secondary" font="cereal-medium">
              Open code scanner
            </Text>
          </View>
        </Button>
      </View>
    </BaseView>
  );
};

export default SelfQR;
