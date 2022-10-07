import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import IconButton from '@main-components/IconButton';
import useGetActiveTripRequest from '@modules/request/application/hooks/use-get-trip-request';
import useRequestTrip from '@modules/request/application/hooks/use-request-trip';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import Image from '@main-components/Image';
import {Image as Image2} from 'react-native';

import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import { travelActions } from 'integration/modules/Travel/store/travel.slice';
import React, { useEffect } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import OptionLabel from './components/OptionLabel';
import { PaymentMethodsRow } from './components/PaymentMethodsRow';
import ServiceOptionsRow from './components/ServiceOptionsRow';
import TripStatsRow from './components/TripStatsRow';
import { View,Text } from 'react-native';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';


interface NewTripRequestOptionsCardProps {
    onCancel?: any;
    fees: {
        [feeKey: string]: {
            amount: number;
            currency: string;
        };
    };
    tripDistance: string;
    tripDuration: string;
    onSelectServiceType: any;
    selectedServiceType: string;
    onSelectPaymentMethod: any;
    selectedPaymentMethod: string;
    onRequestTrip: any;
    requesting: boolean;
}

export default function NewTripRequestOptionsCard(
    props: NewTripRequestOptionsCardProps
) {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <Box>
            <Box flexDirection="row" justifyContent="flex-end" mb="s" mr="s">
                <IconButton
                    onPress={() => {
                      
                        props.onCancel && props.onCancel();
                    }}
                    iconName="times"
                    iconColor="white"
                    backgroundColor="primaryMain"
                    size={15}
                    borderRadius={20}
                    containerSize={40}
                />
            </Box>
            <Box>
                <View style={{
                    backgroundColor:THEME_PRIMARY_COLOR,
                    justifyContent: 'center',
                    alignItems : 'center',
                    borderRadius : 5,
                    flexDirection :'row',
                    paddingVertical : 6
                    }}>
                <Text style={{
                    margin : 0,
                    padding : 0,
                    'color': 'white',
                    }}>
                        Selecciona tu CityCero
                    </Text>

                <Image2
                        source={images.HOJAS_SOLAS}
                        style={{
                            width : 20,
                            height : 16,
                            position : 'relative',
                            top : -7,
                            left : -8


                        }}
                    />
                </View>
                
            </Box>
            <Box mt="s">
                <ServiceOptionsRow
                    onSelect={(type: string) => props.onSelectServiceType(type)}
                    selected={props.selectedServiceType}
                />
            </Box>
            <Box mt="s">
                <TripStatsRow
                    fee={props.fees[props.selectedServiceType]}
                    tripDistance={props.tripDistance}
                />
            </Box>

            <Box mt="s">
                <OptionLabel title="Selecciona el método de pago" />
            </Box>

            <Box mt="s">
                <PaymentMethodsRow
                    onSelect={(type: string) =>
                        props.onSelectPaymentMethod(type)
                    }
                    selected={props.selectedPaymentMethod}
                    onSelectAndRequest={(type: string) => {
                        props.onSelectPaymentMethod(type);
                        props.onRequestTrip({ paymentMethod: type });
                    }}
                />
            </Box>

            <Box mt="s" mb="s">
                <Button
                    icon={() => (
                        <AppIcon
                            name="check-1"
                            color={theme.colors.successMain}
                            size={15}
                        />
                    )}
                    onPress={() => {
                        props.onRequestTrip();
                    }}
                    title="Pedir viaje"
                    rounded={false}
                    loading={props.requesting}
                    disabled={props.requesting}
                />
            </Box>
        </Box>
    );
}

export function AnimatedNewTripRequestOptionsCard(
    props: NewTripRequestOptionsCardProps
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
            bottom: 0,
            zIndex: 9999,
            width: dimensions.width,
            padding: 6,
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
            <NewTripRequestOptionsCard {...props} />
        </Animated.View>
    );
}

export function NewTripRequestOptionsCardController() {
    const {
        showRequestOptions,
        preRequestData,
        selectedServiceType,
        updateRequestData,
        resetRequestState,
        showRequestModal,
        selectedPaymentMethod,
        requestData,
        setShowRequestOptions
    } = useDashboardContextProvider((state) => ({
        showRequestOptions: state.showRequestOptions,
        preRequestData: state.preRequestData,
        setPreRequestData: state.setPreRequestData,
        selectedServiceType: state?.requestData?.service,
        updateRequestData: state.updateRequestData,
        resetRequestState: state.resetRequestState,
        showRequestModal: state.showRequestModal,
        selectedPaymentMethod: state?.requestData?.paymentMethod,
        requestData: state.requestData,
        setShowRequestOptions: state.setShowRequestOptions
    }));

    const { request: activeRequest } = useGetActiveTripRequest();

    const hide =
        !showRequestOptions ||
        !preRequestData ||
        showRequestModal ||
        activeRequest;

    const { request, loading: requesting } = useRequestTrip();

    useEffect(() => {
        if (!hide) {
            const initialRequest = {
                service: 'city_economic',
                paymentMethod: 'CASH'
            };
            updateRequestData(initialRequest);
        }
    }, [hide]);
    if (hide) return <Box />;

    return (
        <AnimatedNewTripRequestOptionsCard
            onCancel={() => {
                setShowRequestOptions(false);
                resetRequestState();
            }}
            fees={preRequestData.fees}
            tripDistance={preRequestData.tripDistance.text}
            tripDuration={preRequestData.tripDuration.text}
            selectedServiceType={selectedServiceType}
            onSelectServiceType={(type: string) => {
                updateRequestData({
                    service: type
                });
            }}
            selectedPaymentMethod={selectedPaymentMethod}
            onSelectPaymentMethod={(method: string) => {
                updateRequestData({
                    paymentMethod: method
                });
            }}
            onRequestTrip={(props?: any) => {
                request({
                    ...requestData,
                    stops: requestData.stops?.map((stop: any) => {
                        return {
                            address: stop.address,
                            lat: stop.coords.latitude,
                            lng: stop.coords.longitude
                        };
                    }),
                    origin: {
                        address: requestData.origin.address,
                        lat: requestData.origin.coords.latitude,
                        lng: requestData.origin.coords.longitude
                    },
                    destination: {
                        address: requestData.destination.address,
                        lat: requestData.destination.coords.latitude,
                        lng: requestData.destination.coords.longitude
                    },
                    paymentMethod:
                        props && props.paymentMethod
                            ? props.paymentMethod
                            : requestData.paymentMethod
                });

                setTimeout(() => {
                    setShowRequestOptions(false);
                    resetRequestState();
                }, 1000);
            }}
            requesting={requesting}
        />
    );
}
