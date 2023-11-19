import { useRecord } from 'api/useRecords';
import BaseView from 'components/BaseView';
import SceneHeader from 'components/SceneHeader';
import Text from 'components/Text';
import React, { memo } from 'react';
import { Image, Pressable, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FlashList } from '@shopify/flash-list';

function replacePdfWithJpgInUrl(url: string) {
  // Use a regular expression to replace the last occurrence of ".pdf" with ".jpg"
  const replacedUrl = url.replace(/(.+)\.pdf(?=[^/]*$)/i, "$1.jpg");
  return replacedUrl;
}

type RecordParamList = {
  "record-view": { url: string } | undefined;
};

const File = ({ item }: any) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RecordParamList>>();
  if (item.mimeType.split("/")[0] == "image") {
    return (
      <Pressable
        onPress={() => navigate("record-view", { url: item.url })}
        className="p-2 mb-4 border border-gray-200 rounded"
      >
        <Image
          source={{ uri: item.url }}
          style={{ height: 400 }}
          resizeMode="contain"
        />
      </Pressable>
    );
  } else if (item.mimeType == "application/pdf") {
    return (
      <Pressable
        onPress={() =>
          navigate("record-view", { url: replacePdfWithJpgInUrl(item.url) })
        }
        className="p-2 mb-4 border border-gray-200 rounded"
      >
        <Image
          source={{ uri: replacePdfWithJpgInUrl(item.url) }}
          style={{ height: 400 }}
          resizeMode="contain"
        />
      </Pressable>
    );
  }
};

const Record = ({ route }: any) => {
  const { record } = useRecord(route.params.id);
  return (
    <BaseView>
      <SceneHeader
        heading={record?.title}
        subHeadingComponent={<Text>{record?.description}</Text>}
      />
      <View className="h-full mt-4">
        <FlashList
          data={record?.files}
          renderItem={({ item }) => <File item={item} />}
          keyExtractor={(item: any) => item.id}
          estimatedItemSize={100}
        />
      </View>
    </BaseView>
  );
};

export default memo(Record);
