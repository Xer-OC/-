import { useMemo } from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { SensorType, useAnimatedSensor, useAnimatedStyle } from 'react-native-reanimated';

const MAX_OFFSET = 6;

type UseParallaxOptions = {
  depthLevel?: number;
};

export function useParallax({ depthLevel = 1 }: UseParallaxOptions = {}) {
  const { width, height } = useWindowDimensions();
  const lowEndDevice = useMemo(() => Platform.OS === 'android' && (width < 360 || height < 640), [height, width]);
  const motionEnabled = !lowEndDevice;

  const sensor = useAnimatedSensor(SensorType.ROTATION, {
    interval: 120
  });

  const animatedStyle = useAnimatedStyle(() => {
    if (!motionEnabled) {
      return {
        transform: [{ translateX: 0 }, { translateY: 0 }, { scale: 1 }]
      };
    }

    const pitch = sensor.sensor.value.pitch ?? 0;
    const roll = sensor.sensor.value.roll ?? 0;
    const translateX = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, roll * MAX_OFFSET * depthLevel));
    const translateY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, pitch * MAX_OFFSET * depthLevel));

    return {
      transform: [{ translateX }, { translateY }, { scale: 1 + 0.01 * depthLevel }]
    };
  }, [depthLevel, motionEnabled]);

  return {
    animatedStyle,
    motionEnabled,
    maxOffset: MAX_OFFSET
  };
}
