import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Image from '@main-components/Image';
import useGetTripRequestFees from '@modules/request/application/hooks/use-get-trip-request-fees';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useMemoOne } from '@modules/_shared/domain/utils/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { travelActions } from 'integration/modules/Travel/store/travel.slice';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import useSubmitRequest from '../../hooks/useSubmitRequest';
import { OriginInput } from './components/OriginInput';
import RouteInput from './components/RouteInput';

interface RequestFormProps {
    onConfirm?: any;
}

export default function RequestForm(props: RequestFormProps) {
    useInitializeForm();

    // const { submit, loading } = useSubmitForm();
    const { submit } = useSubmitRequest();
    useSubmitForm({
        onSubmit: () => {
            submit();
        }
    });

    useInputFocusHandler();

    const { updateStopLocation, stops } = useDashboardContextProvider(
        (state) => ({
            updateStopLocation: state.updateStopLocation,
            stops: state.pickLocation?.stops
        })
    );

    return (
        <Box paddingBottom="m">
            <Box alignItems="center" flexDirection="row" padding="m">
                <DestinationRoutesController />
                <Box flex={1}>
                    <RequestInputWrapper
                        key="origin"
                        isOrigin
                        onAddRoute={() => {
                            console.log('Entro');
                            updateStopLocation({
                                'stop-1': {
                                    coords: null,
                                    address: ''
                                }
                            });
                        }}
                        canAddRoutes={!stops['stop-1']}
                    >
                        <OriginInput noMargin placeholder="Ubicación actual" />
                    </RequestInputWrapper>
                    <StopsInput />
                </Box>
            </Box>
            {/* <Box marginHorizontal="m">
                <Button
                    title="Confirmar"
                    loading={loading}
                    onPress={function () {
                        submit();
                    }}
                />
            </Box> */}
        </Box>
    );
}

function useInputFocusHandler() {
    const { pickLocation, routeKey, showPickLocation, updateFocusedInputKey } =
        useDashboardContextProvider((state) => ({
            routeKey: state.routeKey,
            pickLocation: state.pickLocation,
            updateFocusedInputKey: state.updateFocusedInputKey,
            showPickLocation: state.showPickLocation
        }));
    const isCompleted = useIsFormCompleted();

    const origin = pickLocation.origin;
    const destination = pickLocation.stops?.destination;

    useEffect(() => {
        if (showPickLocation) return;
        if (isCompleted) return;

        // if (!isLocationCompleted(origin)) {
        //     updateFocusedInputKey('origin');
        //     return;
        // }

        // if (!isLocationCompleted(destination)) {
        //     updateFocusedInputKey('destination');
        //     return;
        // }
    }, [isCompleted, origin, destination, showPickLocation]);
}

function isLocationCompleted(data: any) {
    return data?.address !== '' && !!data?.coords;
}

export function useIsFormCompleted() {
    const { pickLocation, showPickLocation } = useDashboardContextProvider(
        (state) => ({
            pickLocation: state.pickLocation,
            showPickLocation: state.showPickLocation
        })
    );
    const originFilled =
        pickLocation.origin?.address !== '' && pickLocation.origin?.coords;

    const destinationFilled =
        pickLocation.stops.destination &&
        pickLocation.stops.destination['address'] !== '' &&
        pickLocation.stops.destination['coords'];

    const stopFilled =
        pickLocation.stops['stop-1'] &&
        pickLocation.stops['stop-1']['address'] !== '' &&
        pickLocation.stops['stop-1']['coords'];

    if (showPickLocation) return false;

    if (!!pickLocation.stops['stop-1']) {
        return originFilled && stopFilled && destinationFilled;
    }

    return originFilled && destinationFilled;
}

function useInitializeForm() {
    const { routeKey, updateFocusedInputKey } = useDashboardContextProvider(
        (state) => ({
            routeKey: state.routeKey,
            updateFocusedInputKey: state.updateFocusedInputKey
        })
    );

    useEffect(() => {
        // updateFocusedInputKey('origin');
    }, []);
}

function useSubmitForm({ onSubmit }) {
    const { pickLocation, stops } = useDashboardContextProvider((state) => ({
        pickLocation: state.pickLocation,
        stops: state.pickLocation?.stops
    }));

    const isCompleted = useIsFormCompleted();
    const { submit, loading } = useSubmitRequest();

    useEffect(() => {
        if (isCompleted) {
            onSubmit({
                origin: pickLocation.origin,
                destination: pickLocation.stops['destination']
            });
        }
    }, [isCompleted, pickLocation]);

    // return {
    //     submit: () => {
    //         if (!isCompleted) return;
    //         submit();
    //     },
    //     loading
    // };
}

function DestinationRoutesController() {
    const { stops } = useDashboardContextProvider((state) => ({
        stops: state.pickLocation?.stops
    }));

    const count = Object.keys(stops ?? {}).length;
    return useMemoOne(() => <DestinationRoutes count={count} />, [count]);
}

export function useInputOnFocus(inputName, ref) {
    const {
        routeKey,
        updateFocusedInputKey,
        toggleShowSuggestionList,
        updateSuggestionList,
        togglePickLocation
    } = useDashboardContextProvider((state) => ({
        routeKey: state.routeKey,
        updateFocusedInputKey: state.updateFocusedInputKey,
        toggleShowSuggestionList: state.toggleShowSuggestionList,
        togglePickLocation: state.togglePickLocation,
        updateSuggestionList: state.updateSuggestionList
    }));

    useEffect(() => {
        if (routeKey === inputName) {
            ref.current?.focus();
        }
    }, [routeKey, inputName]);

    return {
        onFocus: () => {
            updateFocusedInputKey(inputName);
            togglePickLocation(false);
            toggleShowSuggestionList(true);
            updateSuggestionList([]);
        }
    };
}

function StopsInput() {
    const {
        stops,
        updateFocusedInputKey,
        toggleShowSuggestionList,
        updateStopLocation,
        updateSuggestionList,
        removeStopLocation,
        togglePickLocation
    } = useDashboardContextProvider((state) => ({
        stops: state.pickLocation?.stops,
        updateFocusedInputKey: state.updateFocusedInputKey,
        toggleShowSuggestionList: state.toggleShowSuggestionList,
        updateStopLocation: state.updateStopLocation,
        togglePickLocation: state.togglePickLocation,
        updateSuggestionList: state.updateSuggestionList,
        removeStopLocation: state.removeStopLocation
    }));
    const ref = useRef();
    const refStop = useRef();
    const { onFocus } = useInputOnFocus('destination', ref);
    const { onFocus: onFocusStop } = useInputOnFocus('stop-1', refStop);
    const dispatch = useDispatch();

 
    return (
        <Box flex={1}>
            {stops && stops['stop-1'] && (
                <RequestInputWrapper
                    key={'stop-1'}
                    onAddRoute={() => { }}
                    onRemoveRoute={(index) => {
                        removeStopLocation('stop-1');
                    }}
                    isOrigin={false}
                    isDestination={false}
                >
                    <RouteInput
                        noMargin
                        routeKey={`stop-1`}
                        value={stops['stop-1']?.address}
                        ref={refStop}
                        onChangeText={(value) => {
                            updateStopLocation({
                                'stop-1': {
                                    coords: null,
                                    address: value
                                }
                            });
                        }}
                        onFocus={() => {
                            
                            onFocusStop();
                        }}
                        placeholder={'Indica tu próxima parada'}
                    />
                </RequestInputWrapper>
            )}

            {stops && stops['destination'] && (
                <RequestInputWrapper
                    key={'destination'}
                    isOrigin={false}
                    isDestination={true}
                >
                    <RouteInput
                        noMargin
                        routeKey={`destination`}
                        //value={stops['destination']?.address}
                        ref={ref}
                        onChangeText={(value: string) => {

                            dispatch(travelActions.setInputAdondeVas((value ? value : '')))
                            console.log(value)
                            updateStopLocation({
                                destination: {
                                    coords: null,
                                    address: value
                                }
                            });

                        }}
                        onFocus={() => {
                            
                            onFocus();
                        }}
                        placeholder={'¿A donde vas?'}
                    />
                </RequestInputWrapper>
            )}
        </Box>
    );
}

export function useGetTripInfo() {
    const [preRequestDetails, setPreRequestDetails] = useState<any>(undefined);
    const [enabled, setEnabled] = useState(false);

    const {
        data: tripInfo,
        loading,
        loaded
    } = useGetTripRequestFees(
        preRequestDetails ? preRequestDetails.origin : undefined,
        preRequestDetails ? preRequestDetails.destination : undefined,
        undefined,
        { enabled: enabled }
    );

    const action = (data: any) => {
        setPreRequestDetails(data);
        setEnabled(true);
    };

    // if (!loading && loaded && enabled) {
    //     setEnabled(false);
    //     onResolve(tripInfo, preRequestDetails);
    // }

    return {
        get: (data: { origin: any; destination: any; stops?: any[] }) => {
            action(data);
        },
        tripInfo,
        loading
    };
}

function DestinationRoutes({ count }:any) {
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
                <View  key={`k8-${i}`}>
                    <Divisor />
                    {i + 1 == count ? <Destination /> : <Route />}
                </View>
            ))}
        </Box>
    );
}

function RequestInputWrapper({
    children,
    isOrigin = false,
    isDestination = false,
    onAddRoute,
    canAddRoutes,
    onRemoveRoute
}: {
    children: any;
    isOrigin?: boolean;
    isDestination?: boolean;
    onAddRoute?: () => any;
    canAddRoutes?: boolean;
    onRemoveRoute?: () => any;
}) {
    const theme = useTheme();
    const canRemove = !isOrigin && !isDestination;
    return (
        <Box
            style={{
                marginTop: isOrigin ? 0 : 15
            }}
            flexDirection="row"
            alignItems="center"
            width="100%"
        >
            <Box flex={1}>
                <Box
                    borderRadius={4}
                    borderWidth={1}
                    borderColor="greyMedium"
                    height={40}
                >
                    {children}
                </Box>
            </Box>

            <Box ml="s" justifyContent="center" alignItems="center">
                <TouchableOpacity
                    // disabled={isOrigin}
                    onPress={() => {
                        if (canRemove) {
                            onRemoveRoute && onRemoveRoute();
                            return;
                        }
                        onAddRoute && onAddRoute();
                        Alert.alert(
                            'Parada',
                            'Si agregas una parada, no se actualizará el valor total del viaje, siempre y cuando no te detengas por más de 3 minutos. Utilízalo para recoger a un amigo, o para hacer una entrega rápida.'
                        );
                    }}
                >
                    {/* {isOrigin && (
                        <AppIcon
                            name={
                                isOrigin
                                    ? 'pin'
                                    : !isDestination
                                    ? 'times'
                                    : 'plus'
                            }
                            color={theme.colors.primaryMain}
                            size={20}
                        />
                    )} */}
                    {canRemove ? (
                        <Icon
                            name={'times'}
                            color="primaryMain"
                            numberSize={20}
                        />
                    ) : (
                        canAddRoutes && (
                            <AppIcon
                                name={'plus'}
                                color={theme.colors.primaryMain}
                                size={20}
                            />
                        )
                    )}
                </TouchableOpacity>
            </Box>
        </Box>
    );
}
