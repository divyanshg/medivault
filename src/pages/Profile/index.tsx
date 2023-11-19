import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import Text from 'components/Text';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import useAuth from 'stores/auth';

import User from '../Home/components/User';

const Profile = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  function handleLogout() {
    Alert.alert(t`Logout`, t`Are you sure you want to logout?`, [
      {
        text: t`Cancel`,
        onPress: () => null,
        style: "cancel",
      },
      {
        text: t`Logout`,
        onPress: logout,
        style: "destructive",
      },
    ]);
  }

  return (
    <BaseView>
      <User />
      <Button onPress={handleLogout} variant="destructive">
        <Text className="text-white" font="cereal-medium">
          Logout
        </Text>
      </Button>
    </BaseView>
  );
};

export default Profile;
