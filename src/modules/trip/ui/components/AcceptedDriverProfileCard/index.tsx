import Box from '@main-components/Box';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { DetailsRow } from './components/DetailsRow';
import { ProfileActions } from './components/ProfileActions';
import { ProfileHeader } from './components/ProfileHeader';

interface AcceptedDriverProfileCardProps {
    onClose: any;
    profilePictureUrl?: string;
    firstName: string;
    lastName: string;
    rating: number;
    carInfo?: {
        carBrand: string;
        carModel: string;
        carYear: number;
        patent: string;
    };
}

export default function AcceptedDriverProfileCard(
    props: AcceptedDriverProfileCardProps
) {
    return (
        <Box style={{
            backgroundColor: '#f6f6f6',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,

        }} p="m" borderRadius={10} height={320} bg="white">
            <Box width="100%">
                <ProfileHeader
                    profilePictureUrl={props.profilePictureUrl}
                    firstName={props.firstName}
                    lastName={props.lastName}
                />
                <DetailsRow rating={props.rating} carInfo={props.carInfo} />
                <ProfileActions onClose={props.onClose} />
            </Box>
        </Box>
    );
}

export function AnimatedAcceptedDriverProfileCard(
    props: AcceptedDriverProfileCardProps
) {
    const dimensions = useDimensions();
    const initialPosition = { x: 0, y: -dimensions.height * 2 };
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
            top: 120,
            zIndex: 9999,
            width: dimensions.width,
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ],
            paddingHorizontal: 10
        };
    });

    return (
        <Animated.View style={{ ...animatedStyle }}>
            <AcceptedDriverProfileCard {...props} />
        </Animated.View>
    );
}

export function AcceptedDriverProfileCardController() {
    const { trip } = useGetActiveTrip();

    const { showTripDriverCard, setShowTripDriverCard } =
        useDashboardContextProvider((state) => ({
            showTripDriverCard: state.showTripDriverCard,
            setShowTripDriverCard: state.setShowTripDriverCard
        }));

    if (!showTripDriverCard || !trip) return <Box />;

    return (
        <AnimatedAcceptedDriverProfileCard
            onClose={() => {
                setShowTripDriverCard(false);
            }}
            firstName={trip.acceptedDriver.firstName}
            lastName={trip.acceptedDriver.lastName}
            profilePictureUrl={trip.acceptedDriver.profilePictureUrl}
            rating={trip.acceptedDriver.rating}
            carInfo={trip.acceptedDriver.carInfo}
        />
    );
}
