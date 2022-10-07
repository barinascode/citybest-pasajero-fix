import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useGetActiveTripRequest from '@modules/request/application/hooks/use-get-trip-request';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import useGetCurrentPositionAddress from '@modules/user/application/hooks/use-get-current-position-address';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import { travelActions } from 'integration/modules/Travel/store/travel.slice';
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

export interface SearchBarOptionsBarProps { }

export default function SearchBarOptionsBar(props: SearchBarOptionsBarProps) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { setShowRequestModal, togglePickLocation } =
        useDashboardContextProvider((state) => ({
            setShowRequestModal: state.setShowRequestModal,
            togglePickLocation: state.togglePickLocation
        }));

    return (
        <Box
            flexDirection="row"
            style={{
                width: '100%',
                height: 50,
                paddingHorizontal: 10
            }}
        >
            <TouchableOpacity
                style={{ flex: 0.5 }}
                onPress={() => {
                    setShowRequestModal(true);
                }}
            >
                <Box
                    mr="xs"
                    borderRadius={5}
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingHorizontal="s"
                    style={{
                        backgroundColor: '#f6f6f6',
                        height:'95%',
                    }}
                >
                    <Text variant="heading3" color="greyMain">
                        ¿A dónde vas ?
                    </Text>
                    <AppIcon
                        name="search"
                        size={20}
                        color={theme.colors.primaryMain}
                    />
                </Box>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    flex: 0.5,
                    height:'95%',
                    backgroundColor: THEME_PRIMARY_COLOR,
                    borderRadius : 3
                }}
                onPress={() => {
                    // isHotelRequest
                    dispatch(travelActions.setIsHotelRequest(true))
                    setShowRequestModal(true);
                    // togglePickLocation(true);
                }}
            >
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: 10,
                    }}
                    source={images.PASAJEROHOTELES}
                />
            </TouchableOpacity>
        </Box >
    );
}

export function AnimatedSearchOptionsBar(
    props: SearchBarOptionsBarProps & { location?: any }
) {
    const dimensions = useDimensions();
    const initialPosition = { x: -dimensions.width * 2, y: 50 };
    const targetPosition = { x: 0, y: 50 };

    const translateX = useSharedValue(initialPosition.x);
    const translateY = useSharedValue(initialPosition.y);

    useEffect(() => {
        translateX.value = initialPosition.x;
        translateX.value = withSpring(targetPosition.x, {
            damping: 20,
            stiffness: 90
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            top: 70,
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
            <SearchBarOptionsBar {...props} />
        </Animated.View>
    );
}

export function SearchOptionsBarController() {
    const { data: address, loading } = useGetCurrentPositionAddress();

    const { showRequestOptions } = useDashboardContextProvider((state) => ({
        showRequestOptions: state.showRequestOptions
    }));

    const { request } = useGetActiveTripRequest();
    const { trip } = useGetActiveTrip();

    const hide = request || trip || showRequestOptions;

    if (!address || loading) return <Box />;

    if (hide) return <Box />;

    return (
        <AnimatedSearchOptionsBar
            location={{
                streetName: address?.street ?? '',
                address: address?.shortAddress ?? ''
            }}
        />
    );
}
