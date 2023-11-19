import React from 'react';
import { Image } from 'react-native';

const RecordView = ({ route }: any) => {
  return (
    <Image
      source={{ uri: route.params.url }}
      style={{ height: "100%" }}
      resizeMode="contain"
      className="bg-black"
    />
  );
};

export default RecordView;
