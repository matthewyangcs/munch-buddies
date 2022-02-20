import { Animated } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
export const fadeInOut = (ref, fadeIn, fadeOut, loop = false) => {
  const animation = Animated.sequence([
    Animated.timing(ref, {
      toValue: 1,
      duration: fadeIn,
      delay: 500,
      easing: Easing.bezier(0.1, 0.1, 0.3, 0.3),
      useNativeDriver: true,
    }),
    Animated.timing(ref, {
      toValue: 0,
      duration: fadeOut,
      easing: Easing.bezier(0.1, 0.1, 0.3, 0.3),
      useNativeDriver: true,
    }),
  ]);
  if (loop) {
    return Animated.loop(animation);
  }

  return animation;
};
