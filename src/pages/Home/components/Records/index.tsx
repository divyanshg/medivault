import { useRecords } from 'api/useRecords';
import Record from 'components/Record';
import SceneHeader from 'components/SceneHeader';
import Text from 'components/Text';
import React, { memo } from 'react';
import { View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import { FlashList } from '@shopify/flash-list';

const Records = () => {
  const { records, refetch, isLoading } = useRecords();

  return (
    <View className="h-full">
      <FlashList
        refreshControl={<RefreshControl refreshing={isLoading} />}
        refreshing={isLoading}
        onRefresh={refetch}
        className="pb-24"
        contentContainerStyle={{
          paddingBottom: 240,
        }}
        data={records}
        ListHeaderComponent={
          <View className="pb-4">
            <SceneHeader
              heading="My Records"
              subHeadingComponent={
                <Text>
                  Your records are safe with us. You can access them anytime.
                </Text>
              }
              showBackButton={false}
            />
          </View>
        }
        renderItem={({ item }) => <Record {...item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center">No records found</Text>
        }
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default memo(Records);
