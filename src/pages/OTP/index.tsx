import { useVerifyOtp } from 'api/useLogin';
import BaseView from 'components/BaseView';
import { Button } from 'components/Button';
import Input from 'components/Input';
import Text from 'components/Text';
import { Formik } from 'formik';
import React, { useEffect } from 'react';
import { KeyboardTypeOptions, Platform, View } from 'react-native';
import useAuth from 'stores/auth';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const keyboardType: KeyboardTypeOptions = Platform.select({
  ios: "number-pad",
  android: "numeric",
  default: "numeric",
});

const Schema = z.object({
  verificationUUID: z.string(),
  otp: z.string().min(4, "Please enter a valid OTP"),
});

const OTP = () => {
  const { verificationUUID } = useAuth();
  const { verifyOtp, isError, error } = useVerifyOtp();

  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, [isError]);

  const handleVerifyOtp = (submit: () => void) => {
    return async () => {
      setIsLoading(true);
      if (verificationUUID) await submit();
    };
  };

  return (
    <BaseView>
      <Text fontSize={24} font="cereal-medium">
        Verify OTP
      </Text>
      <Formik
        initialValues={{ verificationUUID: verificationUUID ?? "", otp: "" }}
        onSubmit={async (values) => verifyOtp(values)}
        validationSchema={toFormikValidationSchema(Schema)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View className="my-4">
            <View className="flex flex-col space-y-4">
              <Input
                onChangeText={handleChange("otp")}
                onBlur={handleBlur("otp")}
                value={values.otp}
                keyboardType={keyboardType}
                placeholder="4 digit code"
                isError={errors.hasOwnProperty("otp")}
                error={errors.otp}
                maxLength={4}
                editable={!isLoading && !isError}
              />
              <Text fontSize={16}>
                We've sent a 4 digit code to your phone number. Please enter it
              </Text>
            </View>
            <Button
              variant="default"
              className="w-full mt-4"
              onPress={handleVerifyOtp(handleSubmit)}
              isLoading={isLoading && !isError}
            >
              <Text className="text-white" font="cereal-medium" fontSize={18}>
                Verify OTP
              </Text>
            </Button>
            {isError ? (
              <Text
                className="my-4 text-center text-error"
                font="cereal-medium"
                fontSize={16}
              >
                Something went wrong. Please try again.
                {JSON.stringify(error)}
              </Text>
            ) : null}
          </View>
        )}
      </Formik>
    </BaseView>
  );
};

export default OTP;
