import ActivityIndicator from '@main-components/ActivityIndicator';
import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Image from '@main-components/Image';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useCancelTrip from '@modules/trip/application/hooks/use-cancel-trip';
import useGetNews from '@modules/trip/application/hooks/use-get-news';
import News from '@modules/trip/domain/models/news';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import {
    ActiveTripRoute,
    PaymentMethod,
    TripGeoPoint,
    TripMeasurement,
    TripStatus
} from '@modules/_shared/domain/models/trip-types';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useMemoOne } from '@modules/_shared/domain/utils/hooks';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { HeaderRow } from './components/HeaderRow';
import { InitialActionsRow } from './components/InitialActionsRow';
import { InitialHeaderRow } from './components/InitialHeaderRow';

interface CurrentTripCardProps {
    id: string;
    driver: {
        id: string;
        email?: string;
        firstName: string;
        lastName: string;
        phone: string;
        profilePictureUrl?: string;
        rating: number;
        carInfo?: {
            carBrand: string;
            carModel: string;
            carYear: number;
            patent: string;
        };
    };
    serviceType: string;
    origin: TripGeoPoint;
    destination: TripGeoPoint;
    distance: TripMeasurement;
    duration: TripMeasurement;
    finalFee: {
        amount: number;
        currency: string;
    };
    status: TripStatus;
    paymentMethod: PaymentMethod;
    routes: ActiveTripRoute[];
    onDriverPicturePress: () => void;
    cancelingTrip: boolean;
    onCancelTrip: any;
    news?: News;
}

export default function CurrentTripCard(props: CurrentTripCardProps) {
    const utils = useUtils();

    const onCall = () => {
        utils.linking.openURL(`tel:+57${props.driver.phone}`);
    };

    const isOnTheWay =
        props.status === 'ON_THE_WAY_TO_DESTINATION' ||
        props.status === 'ROUTE_COMPLETED';

    const [showRoutesDetails, setShowRoutesDetails] = useState(false);

    return (
        <Box p="s" borderRadius={10} style={{
            backgroundColor:'#f6f6f6'
        }}>
            <InitialHeaderRow
                showAd={isOnTheWay}
                finalFee={props.finalFee}
                distance={props.distance}
                duration={props.duration}
                driverPictureUrl={props.driver.profilePictureUrl}
                onDriverPicturePress={props.onDriverPicturePress}
                news={props.news}
            />
            {isOnTheWay && (
                <Box mt="s">
                    <HeaderRow
                        onShowRouteDetails={() => {
                            setShowRoutesDetails(true);
                        }}
                        finalFee={props.finalFee}
                        driverPhoneNumber={'+57' + props.driver.phone}
                    />
                </Box>
            )}
            {!isOnTheWay && (
                <InitialActionsRow
                    onCall={onCall}
                    canceling={props.cancelingTrip}
                    onCancel={props.onCancelTrip}
                />
            )}

            <TripRoutesDetailsModal
                info={{
                    origin: props.origin.address,
                    stop:
                        props.routes && props.routes?.length > 1
                            ? props.routes[0].destination.address
                            : null,
                    destination: props.destination.address
                }}
                show={showRoutesDetails}
                onClose={() => {
                    setShowRoutesDetails(false);
                }}
            />
        </Box>
    );
}

export function TripRoutesDetailsModal({
    onClose,
    show,
    info
}: {
    onClose: any;
    show: boolean;
    info: any;
}) {
    const Routes = useMemoOne(
        () => <DestinationRoutes count={info?.stop ? 2 : 1} />,
        []
    );

    return (
        <Modal
            onDismiss={onClose}
            visible={show}
            contentContainerStyle={{
                width: '80%',
                alignSelf: 'center',
                padding: 0
            }}
        >
            <Box alignItems="center" mt="m" justifyContent="center">
                <Text variant="heading3" bold color="black">
                    Trayecto
                </Text>
            </Box>
            {!info ? (
                <Box
                    p="s"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                    pt="m"
                >
                    <ActivityIndicator size={30} />
                </Box>
            ) : (
                <Box p="s" alignItems="center" flexDirection="row">
                    {Routes}

                    <Box flex={1}>
                        <Box
                            style={{
                                marginTop: 12
                            }}
                            height={40}
                            justifyContent="center"
                            mb="s"
                        >
                            <Text>{info.origin}</Text>
                        </Box>
                        {info.stop && (
                            <Box
                                height={40}
                                style={{
                                    marginTop: 0
                                }}
                                justifyContent="center"
                                mb="s"
                            >
                                <Text>{info.stop}</Text>
                            </Box>
                        )}

                        <Box
                            height={40}
                            style={{
                                marginTop: 10
                            }}
                            justifyContent="center"
                            mb="s"
                        >
                            <Text>{info.destination}</Text>
                        </Box>
                    </Box>
                </Box>
            )}

            <Box pt="s" pb="s" marginHorizontal="m">
                <Button
                    title="Cerrar"
                    uppercase={false}
                    onPress={() => {
                        onClose();
                    }}
                />
            </Box>
        </Modal>
    );
}

function DestinationRoutes({ count }) {
    const theme = useTheme();

    function OriginPoint() {
        return (
            <Box
                width="100%"
                alignItems="center"
                justifyContent="center"
                height={40}
            >
                <Box
                    width={20}
                    height={20}
                    backgroundColor={'primaryMain'}
                    borderRadius={20 / 2}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Box
                        width={7}
                        height={7}
                        backgroundColor={'white'}
                        borderRadius={7 / 2}
                    ></Box>
                </Box>
            </Box>
        );
    }

    function Divisor() {
        return (
            <Box width="100%" justifyContent="center" height={15}>
                <Box
                    flexDirection="row"
                    width="100%"
                    height={1}
                    style={{
                        transform: [
                            {
                                rotate: '270deg'
                            }
                        ]
                    }}
                    backgroundColor="primaryMain"
                ></Box>
            </Box>
        );
    }

    function Route() {
        return (
            <Box
                width="100%"
                alignItems="center"
                justifyContent="center"
                height={40}
            >
                <AppIcon
                    name="pin"
                    size={20}
                    color={theme.colors.primaryMain}
                />
            </Box>
        );
    }

    function Destination() {
        return (
            <Box
                height={40}
                width="100%"
                alignItems="center"
                justifyContent="center"
            >
                <Image
                    source={images.DESTINATION}
                    style={{ width: 20, height: 20, resizeMode: 'contain' }}
                />
            </Box>
        );
    }

    return (
        <Box flex={0} width={30}>
            <OriginPoint />
            {[...new Array(count)].map((a, i) => (
                <View  key={`ko-${i}`}>
                    <Divisor />
                    {i + 1 == count ? <Destination key={`ke-${i}`}/> : <Route key={`ki-${i}`}/>}
                </View>
            ))}
        </Box>
    );
}

export function AnimatedCurrentTripCard(props: CurrentTripCardProps) {
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
            bottom: 5,
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
            <CurrentTripCard {...props} />
        </Animated.View>
    );
}

export function CurrentTripCardController() {
    const { trip } = useGetActiveTrip();
    const { setShowTripDriverCard } = useDashboardContextProvider((state) => ({
        setShowTripDriverCard: state.setShowTripDriverCard
    }));

    const { cancel, loading: cancelingTrip } = useCancelTrip();
    const { data: news } = useGetNews();

    useEffect(() => {
        if (trip && trip.status === 'ACCEPTED') {
            setShowTripDriverCard(true);
        }
    }, [trip]);

    if (!trip || trip.status === 'FINISHED') return <Box />;

    return (
        <AnimatedCurrentTripCard
            id={trip.id}
            origin={trip.requestInfo.origin}
            destination={trip.requestInfo.destination}
            distance={trip.tripDistance}
            driver={trip.acceptedDriver}
            duration={trip.tripDuration}
            routes={trip.routes}
            finalFee={trip.finalFee}
            serviceType={trip.requestInfo.serviceType}
            paymentMethod={trip.paymentMethod}
            status={trip.status}
            onDriverPicturePress={() => {
                setShowTripDriverCard(true);
            }}
            cancelingTrip={cancelingTrip}
            onCancelTrip={() => {
                cancel(trip.id);
            }}
            news={news}
        />
    );
}
