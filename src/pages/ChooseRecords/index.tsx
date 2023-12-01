import { useRecords } from 'api/useRecords';
import BaseView from 'components/BaseView';
import SceneHeader from 'components/SceneHeader';
import Text from 'components/Text';
import React, { memo, useCallback } from 'react';
import { Image, RefreshControl, TouchableOpacity, View } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Button } from '../../components/Button';

type Record = {
  id: string;
  userId: string;
  type: string;
  title: string;
  description: string;
  files: unknown[];
  fileCount: number;
  added_by: string;

  createdAt: string;
  updatedAt: string;
};

const Record = memo(
  ({
    item,
    onPress,
    isSelected,
    onCheckboxPress,
  }: {
    item: Record;
    onPress: () => void;
    isSelected: boolean;
    onCheckboxPress: () => void;
  }) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          paddingVertical: 15,
          borderWidth: 1,
          borderColor: "lightgray",
          borderRadius: 5,
          backgroundColor: isSelected ? "lightgray" : "white",
          marginBottom: 10,
        }}
        onPress={onCheckboxPress}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const ChooseRecords = () => {
  const { records, refetch, isLoading } = useRecords();
  const [selectedRecords, setSelectedRecords] = React.useState<
    Pick<Record, "id">[]
  >([]);

  const toggleRecordSelection = (recordId: string) => {
    const isSelected = selectedRecords.some((record) => record.id === recordId);

    if (isSelected) {
      // If already selected, remove from the selection
      setSelectedRecords((prevSelected) =>
        prevSelected.filter((record) => record.id !== recordId)
      );
    } else {
      // If not selected, add to the selection
      setSelectedRecords((prevSelected) => [...prevSelected, { id: recordId }]);
    }
  };

  return (
    <BaseView>
      <View style={{ paddingBottom: 12 }}>
        <SceneHeader heading="" subHeadingComponent={null} />
        <View className="flex flex-row items-center p-4 -mt-8 space-x-3 border border-gray-300 rounded-lg">
          <View>
            <Image
              source={{
                uri: "https://instagram.fdel10-1.fna.fbcdn.net/v/t51.2885-19/404636847_1108576080304538_8445142939760829004_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fdel10-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=9cXEYhE9yW0AX_T4jDu&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBz0EcS6d90_C58DhteWOnp3Ipk0naB8mnBXj9eJ9hBtg&oe=656F53BA&_nc_sid=8b3546",
              }}
              className="w-20 h-20 rounded-full"
            />
          </View>
          <View>
            <Text fontSize={20} font="cereal-bold">
              Divyansh Gupta
            </Text>
            <Text fontSize={16} font="cereal-medium">
              divyansh@doctor
            </Text>
          </View>
        </View>
      </View>
      <FlashList
        key={selectedRecords.length}
        refreshControl={<RefreshControl refreshing={isLoading} />}
        refreshing={isLoading}
        onRefresh={refetch}
        className="pt-12 pb-12"
        contentContainerStyle={{
          paddingBottom: 240,
        }}
        ListHeaderComponent={
          <View style={{ paddingBottom: 12 }}>
            <SceneHeader
              heading="Choose Records"
              subHeadingComponent={
                <Text>Choose records to share with your doctor</Text>
              }
              showBackButton={false}
            />
          </View>
        }
        data={records as Record[]}
        renderItem={({ item }) => (
          <Record
            item={item}
            onPress={() => {}}
            isSelected={selectedRecords.some((record) => record.id === item.id)}
            onCheckboxPress={() => toggleRecordSelection(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text className="text-center">No records found</Text>
        }
        showsVerticalScrollIndicator={false}
        estimatedItemSize={100}
      />
      {selectedRecords.length > 0 && (
        <Button>
          <Text className="text-white">Share</Text>
        </Button>
      )}
    </BaseView>
  );
};

export default ChooseRecords;
