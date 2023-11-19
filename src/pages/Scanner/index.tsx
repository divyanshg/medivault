import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import SceneHeader from 'components/SceneHeader';
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Scanner = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    if (data.split("@")[1] === "mva") {
      setScanned(true);
      alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    } else {
      return;
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <BaseView>
      <View className="absolute top-0 left-0 z-10 w-[120%] px-6 pt-10 bg-white pb-4">
        <SceneHeader
          heading="Scan QR Code"
          subHeadingComponent={
            <Text className="text-gray-500">Scan the QR code of a doctor</Text>
          }
        />
      </View>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button onPress={() => setScanned(false)}>
          <Text className="text-white">Tap to Scan Again</Text>
        </Button>
      )}
      <View className="absolute bottom-0 left-0 z-10 w-[120%] px-6 pt-10 bg-white pb-4"></View>
    </BaseView>
  );
};

export default Scanner;
