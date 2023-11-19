import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import SceneHeader from 'components/SceneHeader';
import Text from 'components/Text';
import LottieView from 'lottie-react-native';
import React, { memo } from 'react';
import { Image, Platform, View } from 'react-native';

interface LocalAuthenticateProps {
  successCallback: () => void;
  errorCallback?: () => void;
  biometricAuth?: () => void;
}

const AnimatedIcon = memo(() => (
  <LottieView
    autoPlay
    style={{
      width: 200,
      height: 200,
    }}
    speed={1.2}
    // Find more Lottie files at https://lottiefiles.com/featured
    source={require("../../../assets/animations/animation_lnjztviq.json")}
  />
));
const ImageIcon = memo(() => (
  <Image
    source={require("../../../assets/lock.png")}
    style={{
      width: 200,
      height: 200,
    }}
  />
));

const LocalAuthenticate = ({
  successCallback,
  errorCallback,
  biometricAuth,
}: LocalAuthenticateProps) => {
  return (
    <>
      <BaseView>
        <SceneHeader
          heading="Access your account securely"
          showBackButton={false}
          subHeadingComponent={
            <Text>
              To protect your data you can only access the app when it's
              unlocked
            </Text>
          }
        />
        <View className="items-center justify-center flex-1 -mt-16 ">
          {/* {Platform.OS === "android" ? <AnimatedIcon /> : <ImageIcon />} */}
          <ImageIcon />
        </View>
      </BaseView>
      <View className="absolute left-0 flex flex-col w-full p-4 px-6 space-y-4 bottom-4">
        <Button
          variant="outline"
          onPress={successCallback}
          className="border-[#6957C2]"
        >
          <Text font="cereal-medium" className="text-[#6957C2]">
            Unlock with PIN
          </Text>
        </Button>
        {biometricAuth ? (
          <Button className="bg-[#6957C2]" onPress={biometricAuth}>
            <Text font="cereal-medium" className="text-white">
              Unlock with biometrics
            </Text>
          </Button>
        ) : null}
      </View>
    </>
  );
};

export default memo(LocalAuthenticate);
