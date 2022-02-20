import { useRef, useEffect } from "react";
import { Animated, StyleSheet, Image, View } from "react-native";
import Easing from "react-native/Libraries/Animated/Easing";
import React from "react";

import { Images } from "../../assets/Images";
import { fadeInOut } from "./animations";

const Heart = ({ x, y, loop, show }) => {
  const opacityAnmRef = useRef(new Animated.Value(0));
  const opacityAnm = opacityAnmRef.current;
  const posAnmRef = useRef(new Animated.Value(0));
  const posAnm = posAnmRef.current;
  useEffect(() => {
    if (!show) {
      opacityAnmRef.current = new Animated.Value(0);
      posAnmRef.current = new Animated.Value(0);
      return;
    }
  }, [show]);

  useEffect(() => {
    fadeInOut(opacityAnm, 1000, 1200, loop).start();

    Animated.timing(posAnm, {
      toValue: 1,
      duration: 1800,
      easing: Easing.bezier(0.1, 0.1, 0.3, 0.3),
      useNativeDriver: true,
    }).start();
  }, [show]);

  const ty = posAnm.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const tx = posAnm.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });

  return (
    <Animated.View
      style={[
        styles.heartContainer,
        {},
        {
          top: y,
          left: x,
          transform: [
            {
              translateY: ty,
            },
            {
              translateX: tx,
            },
          ],
          zIndex: 9999,
        },
      ]}
    >
      <Animated.View
        style={{
          opacity: opacityAnm,
        }}
      >
        <View>
          <Image
            source={Images.heart}
            style={{
              height: 25,
              width: 25,
            }}
          />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  heartContainer: {
    position: "absolute",
  },
});

export default Heart;
