import BaseView from 'components/BaseView';
import SceneHeader from 'components/SceneHeader';
import Text from 'components/Text';
import { useLanguage } from 'context/language';
import React, { memo } from 'react';
import { View } from 'react-native';
import { RadioGroup } from 'react-native-radio-buttons-group';

export const ChangeComponent = memo(
  ({
    language,
    setLanguage,
    availableLanguages,
  }: {
    language: string;
    setLanguage: (language: string, save: boolean) => void;
    availableLanguages: { id: string; label: string; value: string }[];
  }) => (
    <BaseView>
      <View className="flex flex-col space-y-4">
        <SceneHeader
          heading="Select Language"
          subHeadingComponent={
            <View>
              <Text>Select your preferred language</Text>
              <Text>अपनी पसंदीदा भाषा चुनें</Text>
            </View>
          }
        />
        <RadioGroup
          radioButtons={availableLanguages}
          onPress={(v) => setLanguage(v, true)}
          selectedId={language}
        />
      </View>
    </BaseView>
  )
);

const ChangeLanguage = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  return (
    <ChangeComponent
      language={language}
      setLanguage={setLanguage}
      availableLanguages={availableLanguages}
    />
  );
};

export default memo(ChangeLanguage);
