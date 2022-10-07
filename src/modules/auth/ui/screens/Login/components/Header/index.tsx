import Box from '@main-components/Box';
import LoopingVideo from '@main-components/LoopingVideo';
import StatusBar, { statusBarHeight } from '@main-components/StatusBar';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useDerivedValue,
    withTiming
} from 'react-native-reanimated';

interface HeaderProps {
    show: Animated.SharedValue<number>;
}
const LOGO_WIDTH = 150;
const LOGO_HEIGHT = 150;

export default function Header(props: HeaderProps) {
    const dimensions = useDimensions();
    const height = dimensions.height / 2 + 50;
    const width = dimensions.width;
    const top = statusBarHeight + 30;
    const theme = useTheme();
    const showHeader = useDerivedValue(() => {
        return props.show.value;
    });

    const video = React.useRef<any>(null);

    useEffect(() => {
        video.current?.playAsync();
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            width,
            height: showHeader.value == 1 ? height : 30,
            position: 'relative',
            //   backgroundColor: theme.colors.primaryMain,
            opacity: withTiming(showHeader.value, {
                duration: 0
            })
        };
    });

    return (
        <Box>
            <SecondaryLogo headerShown={showHeader} />

            <Animated.View style={{ ...animatedStyles }}>
                <StatusBar translucent />
                <LoopingVideo
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: width,
                        height: height
                    }}
                    source={images.BG_INIT_VIDEO}
                    resizeMode="cover"
                />
            </Animated.View>
        </Box>
    );
}

function SecondaryLogo({
    headerShown
}: {
    headerShown: Animated.DerivedValue<number>;
}) {
    const opacity = useDerivedValue(() => {
        return headerShown.value == 1 ? 0 : 1;
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            justifyContent: 'center',
            alignItems: 'center',
            top: Platform.OS === 'ios' ? 130 : 80,
            height: opacity.value == 1 ? undefined : 0,
            opacity: withTiming(opacity.value, {
                duration: 700,
                easing: Easing.inOut(Easing.linear)
            })
        };
    });

    return (
        <Animated.View style={{ ...animatedStyle }}>
            <Animated.Image
                resizeMode="contain"
                source={images.CIRCLE_LOGO}
                style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
            />
        </Animated.View>
    );
}
