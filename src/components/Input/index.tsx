import { cn } from 'lib/utils';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { KeyboardTypeOptions, TextInput, TextInputProps, View } from 'react-native';

import Text from '../Text';

interface InputProps extends TextInputProps {
  keyboardType?: KeyboardTypeOptions;
  isError?: boolean;
  error?: string;
}

const Input = React.forwardRef<TextInput, InputProps>(
  ({ keyboardType = "default", ...props }, ref) => {
    const { t } = useTranslation();
    return (
      <View className="flex flex-col space-y-2">
        <TextInput
          ref={ref}
          {...props}
          className={cn(
            "bg-muted text-zinc-900 dark:bg-muted-dark border-2 border-gray-400 dark:border-muted-dark rounded-lg py-3 px-4 focus:border-primary",
            props.isError
              ? "border-error text-error placeholder:text-error"
              : ""
          )}
          style={{ fontFamily: "cereal-regular" }}
          keyboardType={keyboardType}
          placeholder={t(props.placeholder as string)}
        />
        {props.error ? (
          <Text className="text-error" font="cereal-medium">
            {props.error}
          </Text>
        ) : null}
      </View>
    );
  }
);

export default Input;
