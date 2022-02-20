import { Animated } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
export const fadeInOut = (ref, fadeIn, fadeOut, loop = false) => {
  const animation = Animated.sequence([
    Animated.timing(ref, {
      toValue: 1,
      duration: fadeIn,
      delay: 500,
      useNativeDriver: true,
      easing: Easing.ease
    }),
    Animated.timing(ref, {
      toValue: 0,
      duration: fadeOut,
      useNativeDriver: true,
      easing: Easing.ease
    })
  ]);
  if (loop) {
    return Animated.loop(animation);
  }

  return animation;
};
