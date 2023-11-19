import { useLogin } from 'api/useLogin';
import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { KeyboardTypeOptions, Platform, View } from 'react-native';
import { setlogindata } from 'stores/auth';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { useNavigation } from '@react-navigation/native';

const keyboardType: KeyboardTypeOptions = Platform.select({
  ios: "number-pad",
  android: "numeric",
  default: "numeric",
});

const Schema = z.object({
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
});

const Login = () => {
  const { navigate } = useNavigation();

  const [isLoading, setIsLoading] = React.useState(false);

  const { login, isError: loginErrored, error: loginError, data } = useLogin();

  useEffect(() => {
    if (data && data.hasOwnProperty("verificationUUID")) {
      // setlogindata({
      //   verificationUUID: data.verificationUUID,
      // });

      setIsLoading(false);
      navigate("otp" as never);
    }
  }, [data]);

  const handleContinue = (submit: () => void) => {
    return async () => {
      setIsLoading(true);
      await submit();
    };
  };

  return (
    <BaseView>
      <Text fontSize={24} font="cereal-medium">
        Login or Sign up
      </Text>
      <Formik
        initialValues={{ phoneNumber: "" }}
        onSubmit={async (values) => login(values.phoneNumber)}
        validationSchema={toFormikValidationSchema(Schema)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View className="my-4">
            <View className="flex flex-col space-y-4">
              <Input
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                value={values.phoneNumber}
                keyboardType={keyboardType}
                placeholder="Phone number"
                isError={errors.hasOwnProperty("phoneNumber")}
                error={errors.phoneNumber}
                maxLength={10}
              />
              <Text fontSize={16}>
                We'll send you a code to verify your phone number. Standard
                message and data rates apply.
              </Text>
            </View>
            <Button
              variant="default"
              className="w-full mt-4"
              onPress={handleContinue(handleSubmit)}
              isLoading={isLoading}
            >
              <Text className="text-white" font="cereal-medium" fontSize={18}>
                Continue
              </Text>
            </Button>
            {loginErrored ? (
              <Text
                className="my-4 text-center text-error"
                font="cereal-medium"
                fontSize={16}
              >
                Something went wrong. Please try again.
              </Text>
            ) : null}
          </View>
        )}
      </Formik>
    </BaseView>
  );
};

export default Login;
