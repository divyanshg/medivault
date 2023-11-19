import React, { memo } from 'react';
import { Image, View } from 'react-native';

import useUser from '../../../api/useUser';
import Text from '../../../components/Text';
import useAuth from '../../../stores/auth';

const User = () => {
  const { user } = useUser();
  if (!user) return <View></View>;

  return (
    <View className="flex flex-row items-center pb-4 my-4 space-x-2 bg-white border-b-2 border-gray-100">
      <Image
        className="rounded-full w-28 h-28"
        source={{ uri: user?.profilepicture }}
      />
      <View className="">
        <Text disableTranslate font="cereal-medium" fontSize={28}>
          {user?.firstName} {user?.lastName}
        </Text>
        <View className="flex flex-row">
          <Text fontSize={16} font="cereal-bold">
            Vault ID:
          </Text>
          <Text fontSize={16} disableTranslate>
            {" "}
            {user?.vaultId}
          </Text>
        </View>
        <View className="flex flex-row">
          <Text fontSize={16} font="cereal-bold">
            Vault address:
          </Text>
          <Text fontSize={16} disableTranslate>
            {" "}
            {user?.vaultAddress}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(User);
