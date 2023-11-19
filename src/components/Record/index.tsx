import { format } from 'date-fns';
import React, { memo, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { cn } from '../../lib/utils';
import Text from '../Text';

type RecordName =
  | "surgical"
  | "medical"
  | "lab"
  | "prescription"
  | "dental"
  | "allergy"
  | "radiology"
  | "immunization"
  | "insurance"
  | "bill";

type AddedBy =
  | "self"
  | "doctor"
  | "hospital"
  | "insurance"
  | "pharmacy"
  | "lab"
  | "dentist";

export interface RecordProps {
  id: string;
  type: RecordName;
  title: string;
  description: string;
  fileCount: number;
  added_by: string;
  createdAt: string;
  updatedAt: string;
}

function convertableDate(mysqlDatetimeString: string): string {
  const dateFormat = "MMMM dd, yyyy";
  try {
    // Parse the MySQL DATETIME string into a JavaScript Date object
    const date = new Date(mysqlDatetimeString);

    // Format the date using date-fns and the provided format
    const readableDate = format(date, dateFormat);

    return readableDate;
  } catch (error) {
    // Handle parsing errors, e.g., invalid input
    console.error(`Error converting MySQL DATETIME to readable date: ${error}`);
    return "Invalid Date";
  }
}

type RecordParamList = {
  record: { id: string } | undefined;
};

const Record = (props: RecordProps) => {
  // const getColor = useMemo(() => {
  //   switch (props.type) {
  //     case "surgical":
  //       return "red";
  //     case "medical":
  //       return "blue";
  //     case "lab":
  //       return "green";
  //     case "prescription":
  //       return "yellow";
  //     case "dental":
  //       return "purple";
  //     case "allergy":
  //       return "pink";
  //     case "radiology":
  //       return "indigo";
  //     case "immunization":
  //       return "orange";
  //     case "insurance":
  //       return "teal";
  //     case "bill":
  //       return "gray";
  //   }
  // }, [props.type]);

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RecordParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigate("record", { id: props.id })}
      className="p-4 mb-4 border-2 border-gray-100 rounded-lg"
    >
      {props.id != "_blank" ? (
        <View>
          <View className={`rounded`}>
            <Text className={cn("uppercase")} fontSize={12} font="cereal-bold">
              {props.type}
            </Text>
          </View>
          <View className="my-2 space-y-2">
            <View>
              <Text font="cereal-medium">{props.title}</Text>
              <Text font="cereal-medium" fontSize={14} disableTranslate>
                Files: {props.fileCount}
              </Text>
            </View>
            {/* {props.hospital ? (
              <View>
                <Text fontSize={14}>{props.hospital}</Text>
              </View>
            ) : null} */}
            <View>
              <Text fontSize={14}>{convertableDate(props.createdAt)}</Text>
            </View>
          </View>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

export default memo(Record);
