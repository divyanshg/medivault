import Text from 'components/Text';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const SplashScreen = () => {
  return (
    // <ImageBackground
    //   source={require("../../../assets/magicpattern-mesh-gradient-1697737943614.png")}
    //   style={{
    //     width: "100%",
    //     height: "100%",
    //   }}
    //   resizeMode="cover"
    // >
    <View className="items-center justify-center flex-1 ">
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
        }}
        source={require("../../../assets/animations/vault.json")}
      />
      <Text fontSize={30} font="cereal-bold">
        Medivault
      </Text>
    </View>
    //   <View className="items-center justify-center flex-1 ">
    //     <Text
    //       font="cereal-extra-bold"
    //       fontSize={44}
    //       className="mb-4 text-center text-white"
    //       disableTranslate
    //     >
    //       fresha
    //     </Text>
    //   </View>
    // </ImageBackground>
  );
};

export default SplashScreen;
