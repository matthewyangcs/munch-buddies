import { useRef, useEffect } from "react";
import { Animated, StyleSheet, Image, View } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
import React from "react";

import { Images } from "../../assets/Images";
import { fadeInOut } from "./animations";

const Heart = ({ x, y, loop, show }) => {
  const opacityAnm = useRef(new Animated.Value(0)).current;
  const posAnm = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!show) {
      opacityAnm.current = new Animated.Value(0);
      posAnm.current = new Animated.Value(0);
      return;
    }

    fadeInOut(opacityAnm, 1000, 1200, loop).start();

    Animated.timing(posAnm, {
      toValue: 1,
      duration: 1800,
      easing: Easing.bezier(0.1, 0.1, 0.3, 0.3)
    }).start();
  }, [x, y, loop, show]);

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {
          transform: [
            {
              translateY: posAnm.interpolate({
                inputRange: [0, 1],
                outputRange: [y, y - 50]
              })
            },
            {
              translateX: posAnm.interpolate({
                inputRange: [0, 1],
                outputRange: [x, x + 80]
              })
            }
          ],
          zIndex: 999
        }
      ]}
    >
      <Animated.View
        style={{
          opacity: opacityAnm
        }}
      >
        <View>
          <Image
            source={Images.heart}
            style={{
              height: 25,
              width: 25
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heartContainer: {
    position: "absolute"
  }
});

export default Heart;
