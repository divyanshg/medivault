import { Formik } from 'formik';
import React, { useCallback, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Dropdown } from 'react-native-element-dropdown';

import { Feather } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';

import { useAddRecord } from '../../api/useRecords';
import BaseView from '../../components/BaseView';
import BottomSheet, { BottomSheetRef } from '../../components/BottomSheet';
import { Button } from '../../components/Button';
import Input from '../../components/Input';
import SceneHeader from '../../components/SceneHeader';
import Text from '../../components/Text';
import { cn } from '../../lib/utils';
import File from './components/File';

const recordTypes = [
  { label: "Surgical", value: "surgical" },
  { label: "Medical", value: "medical" },
  { label: "Lab", value: "lab" },
  { label: "Prescription", value: "prescription" },
  { label: "Dental", value: "dental" },
  { label: "Allergy", value: "allergy" },

  { label: "Radiology", value: "radiology" },
  { label: "Immunization", value: "immunization" },
  { label: "Insurance", value: "insurance" },
  { label: "Bill", value: "bill" },
];

const AddRecord = () => {
  const [addingRecord, setAddingRecord] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<DocumentPickerResponse[]>(
    []
  );
  const [isSheetClosed, setIsSheetClosed] = useState(true);

  const { mutate: uploadFiles, isLoading } = useAddRecord();

  const handleSelectFiles = useCallback(() => {
    setIsSheetClosed(false);
  }, []);

  const handleAddRecord = async (values: any) => {
    setAddingRecord(true);

    uploadFiles({
      files: selectedFiles,
      otherData: values,
    });
  };

  const pickMultipleFiles = async () => {
    try {
      setIsSheetClosed(true);
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
      });

      setSelectedFiles((prev) => prev.concat(result));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User canceled the picker
      } else {
        throw err;
      }
    }
  };

  return (
    <BaseView>
      <SceneHeader
        heading="Add Record"
        subHeadingComponent={<Text>Enter the details of record.</Text>}
      />
      <View className="flex-1 mt-4">
        <Formik
          initialValues={{
            title: "",
            description: "",
            type: "",
          }}
          onSubmit={handleAddRecord}
        >
          {({ handleSubmit, handleChange, values, handleBlur, errors }) => (
            <View className="flex flex-col space-y-4">
              <View className="flex flex-col space-y-1">
                <Text>Record Type</Text>
                <Dropdown
                  // className={`w-full px-4 my-2 text-lg border border-gray-400 rounded-full android:py-3 ios:-mt-2`}
                  style={{
                    width: "100%",
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    marginTop: 8,
                    borderWidth: 2,
                    borderColor: "#9ca3af",
                    borderRadius: 8,
                  }}
                  data={recordTypes}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={"Select Type"}
                  value={values.type}
                  // onBlur={handleBlur("type")}
                  onChange={({ value }) => handleChange("type")(value)}
                />
              </View>
              <View className="flex flex-col space-y-1">
                <Text>Title</Text>
                <Input
                  className="my-2 mt-2"
                  value={values.title}
                  onBlur={handleBlur("title")}
                  onChangeText={handleChange("title")}
                />
              </View>
              <View className="flex flex-col space-y-1">
                <Text>Description</Text>
                <Input
                  className="my-2 mt-2"
                  value={values.description}
                  onBlur={handleBlur("description")}
                  onChangeText={handleChange("description")}
                />
              </View>
              <View className="flex flex-col space-y-1">
                <View>
                  <FlashList
                    ListFooterComponent={
                      <Pressable
                        onPress={handleSelectFiles}
                        className={cn(
                          "bg-gray-300 rounded h-[100px] w-full flex items-center justify-center px-4",
                          {
                            "w-[100px]": selectedFiles.length > 0,
                          }
                        )}
                      >
                        <Text className="text-center">Select Files</Text>
                      </Pressable>
                    }
                    data={selectedFiles}
                    renderItem={({ item }) => <File file={item} />}
                    keyExtractor={(item) => item.name as string}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    estimatedFirstItemOffset={10}
                  />
                </View>
              </View>
              <Button onPress={handleSubmit as never} isLoading={isLoading}>
                <Text font={"cereal-medium"} className="text-white">
                  Add
                </Text>
              </Button>
            </View>
          )}
        </Formik>
      </View>
      <BottomSheet
        ref={BottomSheetRef}
        snap_points={["40%"]}
        title="Add Records"
        subTitle="Choose an option to add your records"
        isClosed={isSheetClosed}
        setter={setIsSheetClosed}
      >
        <View className="mt-6">
          <View className="flex flex-col w-full space-y-3 ">
            <Button>
              <View className="flex flex-row items-center justify-start w-full space-x-2 ">
                <Feather name="camera" size={28} color="white" />
                <View>
                  <Text className="text-white">Camera</Text>
                </View>
              </View>
            </Button>
            <Button onPress={pickMultipleFiles}>
              <View className="flex flex-row items-center justify-start w-full space-x-2 ">
                <Feather name="image" size={28} color="white" />
                <View>
                  <Text className="text-white">Gallery</Text>
                </View>
              </View>
            </Button>
            <Button onPress={pickMultipleFiles}>
              <View className="flex flex-row items-center justify-start w-full space-x-2 ">
                <Feather name="file" size={28} color="white" />
                <View>
                  <Text className="text-white">File</Text>
                </View>
              </View>
            </Button>
          </View>
        </View>
      </BottomSheet>
    </BaseView>
  );
};

export default AddRecord;
