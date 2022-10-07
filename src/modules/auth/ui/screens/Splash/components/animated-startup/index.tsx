import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import React, { useEffect } from 'react';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

export const SCALE_START = 0.1;
export const SCALE_END = 1.3;

export function AnimatedStartup({ children }) {
    const circleScale = useSharedValue(SCALE_START);

    const isEnd = useDerivedValue(() => {
        return circleScale.value == SCALE_END;
    });
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useDimensions();
    const timingConfig = { duration: 350, easing: Easing.inOut(Easing.linear) };

    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            zIndex: 999999,
            transform: [
                {
                    scale: circleScale.value
                }
            ]
        };
    });

    useEffect(() => {
        circleScale.value = SCALE_START;

        circleScale.value = withTiming(SCALE_END, {
            ...timingConfig,
            duration: 700
        });
    }, []);

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: 'black'
            }}
        >
            <SplashTransition show={isEnd} style={animatedCircleStyle} />

            <AnimatedContent scale={circleScale}>{children}</AnimatedContent>
        </Animated.View>
    );
}

export function SplashTransition({ style, show }) {
    const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useDimensions();

    const showMask = useDerivedValue(() => {
        return !show.value;
    });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            /*  height: showMask.value ? "100%" : 0, */
            flex: showMask.value ? 1 : 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: '#441A7B'
        };
    });

    return (
        <Animated.View
            style={{
                ...animatedStyles
                //flex: 1,
            }}
        >
            <Animated.View
                style={[
                    {
                        // ...StyleSheet.absoluteFillObject,
                        borderRadius: SCREEN_HEIGHT / 2,
                        backgroundColor: '#efeded',

                        width: SCREEN_HEIGHT,
                        height: SCREEN_HEIGHT
                    },
                    style
                ]}
            />
        </Animated.View>
    );
}

export function AnimatedContent({ children, scale }) {
    const showMask = useDerivedValue(() => {
        return interpolate(
            scale.value,
            [SCALE_END - 3, SCALE_END, SCALE_END],
            [0, 1, 1]
        );
    });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: showMask.value == 1 ? withTiming(1, { duration: 600 }) : 0,
            flex: showMask.value == 1 ? 1 : 0,
            height: '100%'
        };
    });

    return (
        <Animated.View style={{ ...animatedStyles }}>{children}</Animated.View>
    );
}
