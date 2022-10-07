import React, { useEffect } from 'react';
import { Dimensions, View } from 'react-native';
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import {
    default as BottomSheetBehavior,
    default as RBottomSheet
} from 'reanimated-bottom-sheet';
import BlurredBackground from './components/BlurredBackground';

const { height } = Dimensions.get('window');

interface BottomSheetProps {
    content: React.ReactNode;
    contentHeight?: number;
    collapsedHeight: number;
    open: boolean;
    onClose: any;
    enabledContentGestureInteraction?: boolean;
    hideBackdrop?: boolean;
}

export default function BottomSheet({
    content,
    contentHeight = height,
    collapsedHeight,
    open = false,
    onClose,
    hideBackdrop = false,
    enabledContentGestureInteraction = true
}: BottomSheetProps) {
    //  const ref = useRef<BottomSheetBehavior>();
    const ref = React.useRef<BottomSheetBehavior>(null);
    const [isOpen, setIsOpen] = React.useState(open);
    const showBackdrop = useSharedValue(open);
    const opacity = useDerivedValue(() => {
        const t = interpolate(showBackdrop.value ? 1 : 0, [0, 1], [0, 1]);

        return t;
    });

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const setOpen = (value: boolean) => {
        ref.current?.snapTo(value ? 0 : 1);
        setIsOpen(value);
    };

    const animatedStyles = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: 9,
            opacity: withTiming(opacity.value, {
                duration: 200,
                easing: showBackdrop.value
                    ? Easing.in(Easing.quad)
                    : Easing.out(Easing.quad)
            }),
            height: showBackdrop.value ? height : 0
        };
    }, [opacity]);

    return (
        <>
            {!hideBackdrop && (
                <Animated.View style={animatedStyles}>
                    <BlurredBackground
                        onPress={() => {
                            showBackdrop.value = false;
                            onClose();
                        }}
                    />
                </Animated.View>
            )}

            <RBottomSheet
                ref={ref}
                onCloseEnd={() => {
                    showBackdrop.value = false;
                    onClose();
                }}
                enabledContentGestureInteraction={
                    enabledContentGestureInteraction
                }
                snapPoints={[contentHeight, collapsedHeight].sort(
                    (a, b) => b - a
                )}
                borderRadius={10}
                onOpenEnd={() => {
                    showBackdrop.value = true;
                }}
                renderContent={() => (
                    <View style={{ zIndex: 9999, height: contentHeight }}>
                        {isOpen ? content : <View />}
                    </View>
                )}
            />
        </>
    );
}
