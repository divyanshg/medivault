import React from 'react';
import { Text, View } from 'react-native';
import { DocumentPickerResponse } from 'react-native-document-picker';

const File = ({ file }: { file: DocumentPickerResponse }) => {
  return (
    <View className="bg-gray-300 rounded h-[100px] w-[100px] flex items-center justify-center px-4 mr-4">
      <Text>{file.name}</Text>
    </View>
  );
};

export default File;
