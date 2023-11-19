import React from 'react';
import { Pressable, PressableProps, View, ViewProps } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import Text from '../Text';

interface SceneHeaderProps extends ViewProps {
  heading: string;
  subHeadingComponent?: React.ReactNode;
  showBackButton?: boolean;
  customBackButton?: React.ReactNode;
  customBackButtonAction?: () => void;
  toolboxComponent?: React.ReactNode;
}

interface BackButtonProps extends PressableProps {}

const BackButton = React.memo(({ onPress }: BackButtonProps) => {
  const { goBack } = useNavigation();

  const action = onPress ? onPress : goBack;

  return (
    <Pressable onPress={action} className="my-1">
      <Ionicons name="arrow-back-sharp" size={28} color="black" />
    </Pressable>
  );
});

const SceneHeader = React.memo(
  React.forwardRef<View, SceneHeaderProps>(
    (
      {
        heading,
        subHeadingComponent,
        showBackButton = true,
        customBackButton,
        customBackButtonAction,
        toolboxComponent,
        ...props
      },
      ref
    ) => (
      <View
        ref={ref}
        {...props}
        className="flex flex-row items-center justify-between"
      >
        <View className="flex flex-col justify-start space-y-1">
          {showBackButton && !customBackButton ? (
            <BackButton onPress={customBackButtonAction} />
          ) : null}
          {!showBackButton && customBackButton ? customBackButton : null}
          <View className="flex flex-col space-y-1">
            <Text font="cereal-bold" fontSize={26}>
              {heading}
            </Text>
            {subHeadingComponent ? subHeadingComponent : null}
          </View>
        </View>
        {toolboxComponent ? toolboxComponent : null}
      </View>
    )
  )
);

export default SceneHeader;
