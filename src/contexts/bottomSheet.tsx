import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import Text from '../components/Text';

const BottomSheetContext = createContext({});

export const BottomSheetProvider = ({
  children,
  ref,
}: {
  children: React.ReactNode;
  ref: any;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  const snapPoints = useMemo(() => ["35%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
    setShowBackdrop(index > -1);
  }, []);

  function handleAddRecords() {
    bottomSheetRef.current?.snapToIndex(0);
    setShowBackdrop(true);
  }

  function handleBackdropPress() {
    bottomSheetRef.current?.close();
    setShowBackdrop(false);
  }

  return (
    <BottomSheetContext.Provider value={{}}>
      {children}
      {showBackdrop ? (
        <Pressable
          onPress={handleBackdropPress}
          className="absolute top-0 left-0 flex-1 w-[120%] h-full bg-gray-800 opacity-40"
        />
      ) : null}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        // backdropComponent={CustomBackdrop}
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.29,
          shadowRadius: 4.65,

          elevation: 7,
          borderRadius: 10,
          backgroundColor: "white",
          borderColor: "lightgray",
          borderWidth: 1,
        }}
      >
        <View className="flex-1 p-5 bg-white rounded-xl">
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};
