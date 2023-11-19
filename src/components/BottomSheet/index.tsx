import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import React, { useCallback, useMemo, useState } from 'react';
import { DimensionValue, Pressable, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import BS from '@gorhom/bottom-sheet';

import { cn } from '../../lib/utils';
import Text from '../Text';

interface ModalProps {
  snap_points?: string[];
  handleChange?: (index: number) => void;
  onClose?: () => void;
  title?: string;
  subTitle?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isClosed?: boolean;
  setter?: React.Dispatch<React.SetStateAction<boolean>>;
}

const calculateBtnPosition = (snapPoints: string[], index: number): string =>
  index != -1
    ? (Number(snapPoints[index].replace("%", "") || 0) + 3).toString() + "%"
    : "0%";

export const BottomSheetRef = React.createRef<BS>();
const BottomSheet = React.forwardRef<BS, ModalProps>(
  (
    {
      snap_points = ["50%"],
      handleChange,
      onClose,
      icon,
      title,
      subTitle,
      children,
      isClosed,
      setter,
    },
    ref
  ) => {
    const snapPoints = useMemo(() => snap_points, []);
    const [currentHeight, setCurrentHeight] = useState<string>(
      calculateBtnPosition(snapPoints, 0)
    );

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      if (index == -1) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setter?.(true);
        onClose?.();
      }
      setCurrentHeight(calculateBtnPosition(snapPoints, index));
      handleChange?.(index);
    }, []);

    const CloseBtn = useCallback(
      () => (
        <View
          style={{
            position: "absolute",
            bottom: currentHeight as DimensionValue,
          }}
        >
          <Pressable
            onPress={handleClosePress}
            className="flex items-center justify-center w-12 h-12 p-3 rounded-full shadow-lg bg-stone-900 opacity-80"
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        </View>
      ),
      [currentHeight]
    );

    const handleClosePress = useCallback(() => {
      ref.current?.close();
    }, []);

    if (isClosed) return null;

    return (
      <BlurView
        intensity={90}
        tint="dark"
        className="absolute inset-0 z-10 w-[113.5%] h-[112%]"
      >
        <View className="items-center justify-start flex-1">
          <CloseBtn />
          <BS
            ref={ref}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose
          >
            <View className="w-full h-full px-4 py-4">
              <View className="flex flex-row space-x-2">
                {icon ? <View>{icon}</View> : null}
                {title ? (
                  <View>
                    <Text font="cereal-bold" fontSize={24}>
                      {title}
                    </Text>
                    {subTitle ? (
                      <Text className="mt-1 text-gray-600">{subTitle}</Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
              {children}
            </View>
          </BS>
        </View>
      </BlurView>
    );
  }
);

export default BottomSheet;
