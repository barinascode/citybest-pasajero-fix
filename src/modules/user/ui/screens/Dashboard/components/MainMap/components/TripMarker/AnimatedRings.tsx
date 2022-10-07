import { THEME_PRIMARY_COLOR } from "integration/Contants";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const Ring = ({ delay }) => {
  const ring = useSharedValue(0);

  const ringStyle = useAnimatedStyle(() => {
    return {
      opacity: 0.7 - ring.value,
      transform: [
        {
          scale: interpolate(ring.value, [0, 1], [0, 4]),
        },
      ],
    };
  });
  useEffect(() => {
    ring.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, {
          duration: 4000,
        }),
        -1,
        false
      )
    );
  }, []);
  return <Animated.View style={[styles.ring, ringStyle]} />;
};

export default function AnimatedRingExample() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Ring delay={0} />
      <Ring delay={1000} />
      <Ring delay={2000} />
      <Ring delay={3000} />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: THEME_PRIMARY_COLOR,
    borderWidth: 4,
  },
});