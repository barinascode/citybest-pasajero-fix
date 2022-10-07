import { statusBarHeight } from '@main-components/StatusBar';
import useDimensions from '@shared/domain/utils/hooks/useDimensions';
import React from 'react';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withSpring
} from 'react-native-reanimated';

export default function ContentWrapper({
    children,
    scrollY,
    headerHeight,
    padding = 15
}: {
    children: any;
    scrollY: any;
    headerHeight: number;
    padding?: number;
}) {
    const { height: SCREEN_HEIGHT } = useDimensions();
    const springConfig = {
        damping: 10,
        mass: 0.2,
        stiffness: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001
    };

    const contentTranslateY = useDerivedValue(() => {
        const int = interpolate(
            scrollY.value,
            [0, headerHeight],
            [headerHeight, 0],
            Extrapolate.CLAMP
        );

        return int;
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: 'white',
            width: '100%',
            position: 'absolute',
            padding: padding,
            paddingBottom: 0,
            height: '100%',
            overflow: 'hidden',
            maxHeight: withSpring(
                SCREEN_HEIGHT - contentTranslateY.value + statusBarHeight,
                springConfig
            ),
            transform: [
                {
                    translateY: withSpring(
                        contentTranslateY.value,
                        springConfig
                    )
                }
            ]
        };
    });

    return React.useMemo(
        () => (
            <Animated.View
                style={{
                    ...animatedStyle
                }}
            >
                {children}
            </Animated.View>
        ),
        [animatedStyle]
    );
}
