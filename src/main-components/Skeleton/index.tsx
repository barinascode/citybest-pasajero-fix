import theme from '@shared/domain/utils/constants/AppTheme';
import React, { useEffect } from 'react';
import { StyleProp, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

const defaultRows = 1;
const defaultColor = '#dfdfdf';
const defaultHighlightColor = theme.colors.greyLight;
const defaultCircleSize = 100;
const defaultSquareSize = 100;
const defaultRectangleHeight = 15;
const defaultRectangleWidth = 200;

interface SkeletonProps {
    type: 'rectangle' | 'square' | 'circle';
    loading: boolean;
    size?: number;
    height?: number | string;
    width?: number | string;
    color?: string;
    highlightColor?: string;
    rows?: number;
    style?: StyleProp<any>;
}

export default function Skeleton(props: SkeletonProps) {
    let {
        type,
        size,
        color,
        highlightColor,
        height,
        rows,
        loading,
        width,
        children,
        style
    } = props;

    const opacity = useSharedValue(0);

    const timingConfig = { duration: 600, easing: Easing.inOut(Easing.linear) };

    useEffect(() => {
        opacity.value = withSequence(
            withTiming(0.2, timingConfig),
            withRepeat(withTiming(1, timingConfig), -1, true),
            withTiming(1, { ...timingConfig })
        );
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            //...(style || {}),
            opacity: opacity?.value
        };
    }, []);

    const otherStyles = style;

    if (type === 'square') {
        return (
            <Square
                loading={loading}
                children={children}
                color={color ? color : defaultColor}
                highlightColor={
                    highlightColor ? highlightColor : defaultHighlightColor
                }
                size={size ? size : defaultSquareSize}
                otherStyles={otherStyles}
                style={animatedStyles}
            />
        );
    }

    if (type === 'circle') {
        return (
            <Circle
                loading={loading}
                children={children}
                color={color ? color : defaultColor}
                highlightColor={
                    highlightColor ? highlightColor : defaultHighlightColor
                }
                size={size ? size : defaultCircleSize}
                otherStyles={otherStyles}
                style={animatedStyles}
            />
        );
    }

    if (type === 'rectangle') {
        let rowCount = defaultRows;

        if (rows > 0) {
            rowCount = parseInt(rows);
        }

        return (
            <Rectangle
                loading={loading}
                children={children}
                rows={rowCount}
                color={color ? color : defaultColor}
                highlightColor={
                    highlightColor ? highlightColor : defaultHighlightColor
                }
                height={height ? height : defaultRectangleHeight}
                width={width ? width : undefined}
                otherStyles={otherStyles}
                style={animatedStyles}
            />
        );
    }

    return null;
}

function Square(props) {
    if (props.loading) {
        return (
            <View
                style={{
                    backgroundColor: props.color,
                    height: props.size,
                    width: props.size,
                    ...props.otherStyles
                }}
            >
                <Animated.View style={{ ...props.style }}>
                    <View
                        style={{
                            backgroundColor: props.highlightColor,
                            height: props.size,
                            width: props.size,
                            ...props.otherStyles
                        }}
                    ></View>
                </Animated.View>
            </View>
        );
    }

    return props.children ? props.children : null;
}

function Rectangle(props) {
    if (props.loading) {
        return (
            <View
                style={{
                    backgroundColor: props.color,
                    marginLeft: 5,
                    marginBottom: 10,
                    width: '100%',
                    ...(props.otherStyles || {})
                }}
            >
                <Animated.View style={{ ...props.style }}>
                    <View
                        style={{
                            backgroundColor: props.highlightColor,
                            height: props.height,
                            width: props.width ? props.width : '100%',
                            ...(props.otherStyles || {})
                        }}
                    ></View>
                </Animated.View>
            </View>
        );
    }

    return props.children ? props.children : null;
}

function Circle(props) {
    if (props.loading) {
        return (
            <View
                style={{
                    backgroundColor: props.color,
                    height: props.size,
                    width: props.size,
                    borderRadius: parseInt(props.size, 10) / 2
                }}
            >
                <Animated.View style={{ ...props.style }}>
                    <View
                        style={{
                            backgroundColor: props.highlightColor,
                            height: props.size,
                            width: props.size,
                            borderRadius: parseInt(props.size, 10) / 2
                        }}
                    ></View>
                </Animated.View>
            </View>
        );
    }

    return props.children ? props.children : null;
}
