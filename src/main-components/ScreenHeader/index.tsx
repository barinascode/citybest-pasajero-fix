import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import { BOX_GAP, DefaultScreenHeader } from '@main-components/MainScreen';
import Text from '@main-components/Text';
import useStackHeaderStyles from '@navigation/user-logged-in-stack/hooks/use-stack-header-styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withSpring
} from 'react-native-reanimated';

export default function ScreenHeader({
    scrollY,
    height,
    width
}: {
    scrollY: any;
    height: number;
    width: number;
}) {
    const navigation = useNavigation();
    const route = useRoute();
    const screenTitle = (route.params as any)?.title;
    const headerStyles = useStackHeaderStyles();

    const springConfig = {
        damping: 10,
        mass: 0.2,
        stiffness: 80,
        overshootClamping: true,
        restDisplacementThreshold: 0.001,
        restSpeedThreshold: 0.001
    };

    const translateY = useDerivedValue(() => {
        const int = interpolate(
            scrollY.value,
            [0, height],
            [0, -height],
            Extrapolate.CLAMP
        );

        return int;
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            // height: headerHeight.value,
            position: 'absolute',
            height: height,
            width: width,
            zIndex: 0,
            transform: [
                {
                    translateY: withSpring(translateY.value, springConfig)
                }
            ]
        };
    });
    const canGoBack = navigation.canGoBack();

    return (
        <Animated.View style={{ ...headerAnimatedStyle }}>
            <DefaultScreenHeader
                offsetTop={height + BOX_GAP}
                maxHeight={height + BOX_GAP}
            />
            <Box
                style={{
                    position: 'absolute',
                    top: height / 2,
                    left: 20,
                    zIndex: 9999,
                    width: '100%'
                }}
            >
                <Box width="100%" flexDirection="row" alignItems="center">
                    {canGoBack && (
                        <Box width={20} flex={0} style={{ marginRight: 10 }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            >
                                <Icon name="arrow-left" size="s" />
                            </TouchableOpacity>
                        </Box>
                    )}
                    <Box
                        width={canGoBack ? width - 20 - 50 : width - 40}
                        flex={0}
                    >
                        <Text
                            color="white"
                            numberOfLines={1}
                            style={{
                                ...(headerStyles.headerTitleStyle as any)
                            }}
                        >
                            {screenTitle}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Animated.View>
    );
}
