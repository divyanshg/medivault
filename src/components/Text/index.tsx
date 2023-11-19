import { TOptions } from 'i18next';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { PixelRatio, Text as PlatformText, TextProps } from 'react-native';

import { cn } from '../../lib/utils';

interface TProps extends TextProps {
  font?:
    | "cereal-black"
    | "cereal-bold"
    | "cereal-extra-bold"
    | "cereal-light"
    | "cereal-medium"
    | "cereal-regular";
  fontSize?: number;
  i18nPayload?: TOptions | undefined;
  disableTranslate?: boolean;
}

const Text = React.forwardRef<PlatformText, TProps>(
  (
    {
      font,
      fontSize,
      i18nPayload = undefined,
      disableTranslate = false,
      ...props
    },
    ref
  ) => {
    const { t } = useTranslation();
    const getFontSize = useCallback(() => {
      const size = fontSize ?? 18;

      return size / PixelRatio.getFontScale();
    }, [fontSize]);

    return (
      <PlatformText
        ref={ref}
        className={props.className && props.className}
        style={{
          fontFamily: font ?? "cereal-regular",
          fontSize: getFontSize(),
        }}
        {...props}
      >
        {disableTranslate
          ? props.children
          : t(props.children as string, i18nPayload)}
      </PlatformText>
    );
  }
);
export default React.memo(Text);
