import { forwardRef, memo, Suspense } from 'react';
import {
    ActivityIndicator, ImageBackground, ScrollView, ScrollViewProps, StatusBar, View, ViewProps
} from 'react-native';

import { cn } from '../../lib/utils';
import { Button } from '../Button';
import Text from '../Text';

interface ScrollableViewProps extends ScrollViewProps {
  horizontalPadding?: boolean;
  refreshControl?: React.ReactElement;
}

interface NonScrollableViewProps extends ViewProps {
  horizontalPadding?: boolean;
}

interface ErrorViewProps extends ViewProps {
  error?: string;
  refetch?: () => void;
}

interface BaseViewProps
  extends NonScrollableViewProps,
    ScrollableViewProps,
    ErrorViewProps {
  scrollable?: boolean;
  isLoading?: boolean;
  isError?: boolean;
}

const ScrollableView = forwardRef<ScrollView, ScrollableViewProps>(
  (
    { children, className, horizontalPadding, refreshControl, ...props },
    ref
  ) => (
    <ScrollView
      ref={ref}
      {...props}
      className={cn(
        "py-12 ios:py-16 bg-white h-full",
        horizontalPadding ? "ios:px-6 android:px-3" : "px-0",
        className && className
      )}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  )
);

const NonScrollableView = forwardRef<View, NonScrollableViewProps>(
  ({ children, className, horizontalPadding, ...props }, ref) => {
    return (
      <View
        ref={ref}
        {...props}
        className={cn(
          "py-12 ios:py-12 h-full bg-white",
          horizontalPadding ? "ios:px-6 android:px-6" : "",
          className && className
        )}
      >
        {children}
      </View>
    );
  }
);

const LoadingView = memo(() => {
  return (
    <View className={`flex-1 justify-center items-center h-full`}>
      <ActivityIndicator size="large" color={"#facc15"} />
    </View>
  );
});

const ErrorView = memo(
  forwardRef<View, ErrorViewProps>(({ error, refetch, ...props }, ref) => {
    return (
      <View
        className={`flex-1 justify-center items-center h-full`}
        {...props}
        ref={ref}
      >
        <Text className={`text-lg text-center text-red-500`}>
          Something went wrong!
        </Text>
        {error ? (
          <Text className={`text-center text-red-500 text-sm`}>
            Error: {error}
          </Text>
        ) : null}
        {typeof refetch === "function" ? (
          <Button variant="destructive" onPress={refetch}>
            <Text>Retry!</Text>
          </Button>
        ) : null}
      </View>
    );
  })
);

const BaseView = forwardRef<View | ScrollView, BaseViewProps>(
  (
    {
      children,
      style,
      scrollable = false,
      refreshControl = undefined,
      isLoading = false,
      isError = false,
      error,
      refetch,
      horizontalPadding = true,
      ...props
    },
    ref
  ) => {
    const Component = scrollable ? ScrollableView : NonScrollableView;
    return (
      <Suspense fallback={<ActivityIndicator />}>
        <Component
          {...props}
          style={style}
          refreshControl={refreshControl}
          horizontalPadding={horizontalPadding}
        >
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          {isLoading ? (
            <LoadingView />
          ) : isError ? (
            <ErrorView error={error} refetch={refetch} />
          ) : (
            children
          )}
        </Component>
      </Suspense>
    );
  }
);

export default BaseView;
