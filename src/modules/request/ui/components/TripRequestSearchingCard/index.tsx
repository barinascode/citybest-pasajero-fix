import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Text from '@main-components/Text';
import useCancelRequest from '@modules/request/application/hooks/use-cancel-request';
import useGetActiveTripRequest from '@modules/request/application/hooks/use-get-trip-request';
import theme, {
    useTheme
} from '@modules/_shared/domain/utils/constants/AppTheme';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import React, { useEffect } from 'react';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';

interface TripRequestSearchingCardProps {
    onCancel: any;
    canceling: boolean;
}
export default function TripRequestSearchingCard(
    props: TripRequestSearchingCardProps
) {
    return (
        <Box
            backgroundColor="white"
            height={200}
            zIndex={9999}
            margin="s"
            style={{
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20
            }}
            p="m"
        >
            <Box
                paddingTop="m"
                paddingHorizontal="xl"
                alignItems="center"
                width="100%"
                flexDirection="row"
            >
                <Box width={40} flex={0}>
                    <Box
                        width={40}
                        height={40}
                        borderRadius={40 / 2}
                        bg="primaryMain"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <AppIcon name="origin" size={20} color="white" />
                    </Box>
                </Box>

                <Box marginHorizontal="m" flex={1}>
                    <AnimatedBar />
                </Box>

                <Box width={40} flex={0}>
                    <Box
                        width={40}
                        height={40}
                        borderRadius={40 / 2}
                        bg="primaryMain"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <AppIcon name="pin-2" size={20} color="white" />
                    </Box>
                </Box>
            </Box>
            <Box
                mt="m"
                mb="m"
                justifyContent="center"
                alignItems="center"
                flexDirection="row"
            >
                <Box
                    justifyContent="center"
                    alignItems="center"
                    width={25}
                    flex={0}
                >
                    <AppIcon
                        name="search"
                        color={theme.colors.primaryMain}
                        size={20}
                    />
                </Box>

                <Box justifyContent="center" alignItems="center" ml="m">
                    <Text color="greyMain">Estamos buscando un City</Text>
                </Box>
            </Box>

            <Button
                title="Cancelar"
                loading={props.canceling}
                onPress={() => {
                    props.onCancel();
                }}
                disabled={props.canceling}
            />
        </Box>
    );
}

function AnimatedBar() {
    const opacity = useSharedValue(0);
    const theme = useTheme();

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
            opacity: opacity?.value,
            width: '100%',
            backgroundColor: theme.colors.successMain,
            height: 10,
            borderRadius: 8
        };
    }, []);

    return <Animated.View style={{ ...animatedStyles }}></Animated.View>;
}

export function AnimatedTripRequestSearchingCard(
    props: TripRequestSearchingCardProps
) {
    const dimensions = useDimensions();
    const initialPosition = { x: 0, y: dimensions.height * 2 };
    const targetPosition = { x: 0, y: 0 };

    const translateX = useSharedValue(initialPosition.x);
    const translateY = useSharedValue(initialPosition.y);

    useEffect(() => {
        translateY.value = initialPosition.y;
        translateY.value = withSpring(targetPosition.y, {
            damping: 20,
            stiffness: 90
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            bottom: -4,
            zIndex: 9999,
            width: dimensions.width,
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        };
    });

    return (
        <Animated.View style={{ ...animatedStyle }}>
            <TripRequestSearchingCard {...props} />
        </Animated.View>
    );
}

export function TripRequestSearchingController() {
    const { request } = useGetActiveTripRequest();
    const { cancel, loading: canceling } = useCancelRequest();

    if (!request || (request && request.status !== 'SEARCHING')) return <Box />;

    return (
        <AnimatedTripRequestSearchingCard
            onCancel={() => {
                cancel();
            }}
            canceling={canceling}
        />
    );
}
