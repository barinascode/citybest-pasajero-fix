import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import IconButton from '@main-components/IconButton';
import MainScreen from '@main-components/MainScreen';
import StatusBar from '@main-components/StatusBar';
import Text from '@main-components/Text';
import { AnimatedStartup } from '@modules/auth/ui/screens/Splash/components/animated-startup';
import { ProcessingPaymentNotificationCardController } from '@modules/notifications/ui/components/ProcesingPaymentNotificationCard';
import { RateDriverNotificationCardController } from '@modules/notifications/ui/components/RateDriverNotificationCard';
import { TripFinishedNotificationCardController } from '@modules/notifications/ui/components/TripFinishedNotificationCard';
import { TripRequestNotFoundNotificationCardController } from '@modules/notifications/ui/components/TripRequestNotFoundNotificationCard';
import { NewTripRequestOptionsCardController } from '@modules/request/ui/components/NewTripRequestOptionsCard';
import { TripRequestSearchingController } from '@modules/request/ui/components/TripRequestSearchingCard';
import useGetFavoriteDestinations from '@modules/trip/application/hooks/use-get-favorite-destinations';
import { AcceptedDriverProfileCardController } from '@modules/trip/ui/components/AcceptedDriverProfileCard';
import { CurrentTripCardController } from '@modules/trip/ui/components/CurrentTripCard';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import ObjectUtils from '@modules/_shared/domain/utils/misc/object-utils';
import HotelesBotonera from 'integration/modules/HotelesBotonera';
import GoogleMap from 'integration/modules/Map/GoogleMap';
import { travelActions } from 'integration/modules/Travel/store/travel.slice';
import TravelProvider from 'integration/modules/Travel/TravelProvider';
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
    Easing,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import DashboardContextProvider from '../../context/DashboardContext';
import AddressListItem from './components/AddressListItem';
import { BottomBarController } from './components/DashboardMenu';
import MainMap from './components/MainMap';
import RequestModal from './components/RequestModal';
import { SearchOptionsBarController } from './components/SearchOptionsBar';
import { UserStatusBarController } from './components/UserStatusBar';
import { UserInternetConection } from './components/UserStatusBar/internetBanner';
import { useSelector } from 'react-redux';
import { getTravelState } from 'integration/modules/Travel/store/travel.slice';

export default function Dashboard(props: any) {
    return (
        
                <DashboardContext>
                    
                        <StatusBar translucent />
                        
                        <TravelProvider>
                            <MainMap />
                        </TravelProvider>
                    

                        <UserStatusBarController />
                        <SearchOptionsBarController />
                        <UserInternetConection />

                        <RequestModal />
                        <TripRequestSearchingController />
                        <NewTripRequestOptionsCardController />
                        <AcceptedDriverProfileCardController />
                        <CurrentTripCardController />
                        <TripRequestNotFoundNotificationCardController />
                        <TripFinishedNotificationCardController />
                        <RateDriverNotificationCardController />
                        <ProcessingPaymentNotificationCardController />

                        <BottomBarController
                            onOpenMenu={() => {
                                props.navigation.openDrawer();
                            }}
                        />
                        
                        <OptionsBottomSheet />

                      
                 
                </DashboardContext>
           
           
    );
}

function OptionsBottomSheet() {
    const {
        showSuggestionList,
        toggleShowSuggestionList,
        suggestionListDismissed,
        showPickLocation
    } = useDashboardContextProvider((state) => ({
        showPickLocation: state.showPickLocation,
        suggestionListDismissed: state.suggestionListDismissed,
        showSuggestionList: state.showSuggestionList,
        toggleShowSuggestionList: state.toggleShowSuggestionList
    }));
    const dimensions = useDimensions();
    const REQUEST_HEADER_HEIGHT = 480;
    const snapPoint = 480;
    const minHeight = 480;

    const top = useSharedValue(dimensions.height);

    const springConfig = {
        damping: 0,
        mass: 0.1,
        stiffness: 20,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01
    };

    const gestureHandler = useAnimatedGestureHandler({
        onStart: (_, ctx) => {
            ctx.startTop = top.value;
        },
        onActive: (event, ctx) => {
            if (ctx.startTop + event.translationY <= REQUEST_HEADER_HEIGHT) {
                return;
            }

            top.value = ctx.startTop + event.translationY;
        },
        onEnd: (_) => {
            if (top.value > snapPoint + 200) {
                top.value = dimensions.height - minHeight;
                runOnJS(toggleShowSuggestionList)(false);
                return;
            }

            top.value = snapPoint;
            runOnJS(toggleShowSuggestionList)(true);
        }
    });

    const style = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            borderRadius: 0,
            left: 0,
            zIndex: 99999999,
            width: '100%',
            bottom: 0,
            elevation: 12,
            paddingVertical: 0,
            backgroundColor: '#f6f6f6',
            // borderTopRightRadius: 50,
            // borderTopLeftRadius: 50,
            top: withSpring(300, springConfig)
        };
    });

    function close() {
        top.value = dimensions.height - minHeight;
        //top.value = 600;
    }

    function open() {
        top.value = snapPoint;
    }

    useEffect(() => {
        if (showSuggestionList) {
            open();
            return;
        } else {
            close();
        }

        // if (showSuggestionList) {
        //     top.value = dimensions.height;
        //     return;
        // }
    }, [showSuggestionList]);

    const theme = useTheme();

    if (suggestionListDismissed || showPickLocation) return <Box></Box>;
    return (
        
            <Animated.View
                style={{
                    ...style
                }}
            >
                <SuggestionListController />
            </Animated.View>
      
    );
}

function SuggestionListController() {
    const {
        routeKey,
        updateOriginLocation,
        updateStopLocation,
        suggestionList,
        searchingSuggestions,
        togglePickLocation,
        updateFocusedInputKey
    } = useDashboardContextProvider((state) => ({
        routeKey: state.routeKey,
        updateOriginLocation: state.updateOriginLocation,
        updateStopLocation: state.updateStopLocation,
        searchingSuggestions: state.searchingSuggestions,
        suggestionList: state.suggestionList,
        updateFocusedInputKey: state.updateFocusedInputKey,
        togglePickLocation: state.togglePickLocation
    }));

    const { location: LocationUtils } = useUtils();
    const { data: favorites, loading } = useGetFavoriteDestinations();
    const dispatch = useDispatch();
    const [showFavoriteList, setShowFavoriteList] = useState(false);
    const travelState = useSelector(getTravelState) 
    
    const theme = useTheme();
    function onPress(item: any) {
        if (!routeKey) {
            updateStopLocation({
                destination: {
                    address: item.address,
                    coords: item.coords
                }
            });
            return;
        }

        if (routeKey === 'origin') {
            updateOriginLocation({
                address: item.address,
                coords: item.coords,
                valid: true
            });

            return;
        }

        updateStopLocation({
            [routeKey]: {
                address: item.address,
                coords: item.coords
            }
        });

    }

    if (showFavoriteList) {
        return (
            <Box flex={1}>
                <AnimatedLoadingSuggestions
                    show={searchingSuggestions || loading}
                />

                <Box
                    style={{
                        backgroundColor: theme.colors.primaryMain,
                        padding: 10,
                        width: '100%',
                        marginTop: -5
                    }}
                    // marginHorizontal="m"
                    flexDirection="row"
                    alignItems="center"
                    mb="m"
                >
                    <IconButton
                        iconType="font-awesome"
                        size={25}
                        containerSize={25}
                        iconColor="white"
                        onPress={function (): void {
                            setShowFavoriteList(false);
                        }}
                        iconName={'chevron-left'}
                    />
                    <Box flex={1} justifyContent="center" alignItems="center">
                        <Box style={{ marginLeft: -20 }}>
                            <Text style={{
                                color: '#fff'
                            }} >Mis Favoritos</Text>
                        </Box>
                    </Box>
                </Box>

                {!loading && favorites?.length === 0 && (
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        height={200}
                        paddingHorizontal="m"
                    >
                        <Box mb="s">
                            <AppIcon
                                color={theme.colors.greyMedium}
                                name="marker"
                                size={30}
                            />
                        </Box>
                        <Text color="greyMedium">Sin favoritos...</Text>
                    </Box>
                )}

                {favorites?.slice(0, 5).map((item) => {
                    return (
                        <Box mb="s" key={item.id}>
                            <AddressListItem
                                iconName={'marker'}
                                addressName={item.place.address}
                                city={''}
                                onPress={() => {
                                    onPress({
                                        ...item,
                                        address: item.place.address,
                                        coords: {
                                            latitude: item.place.geoLocation[0],
                                            longitude: item.place.geoLocation[1]
                                        }
                                    });
                                    
                                    dispatch(travelActions.setDestine({
                                        latitude: item.place.geoLocation[0],
                                        longitude: item.place.geoLocation[1]
                                    }))
                                    setShowFavoriteList(false);
                                }}
                            />
                        </Box>
                    );
                })}
            </Box>
        );
    }


    const FijarEnElMapa = ()=>{

        if(travelState.isHotelRequest && travelState.inputAdondeVas)
            return <Box mb="s" key="pin" >
                <AddressListItem
                    iconName={'marker'}
                    iconBackground={theme.colors.primaryMain}
                    addressName={'Fijar en el mapa'}
                    city={''}
                    onPress={() => {
                        Keyboard.dismiss();
                        togglePickLocation(true);
                       
                    }}
                />
            </Box> 
        
        if(!travelState.isHotelRequest)
            return <Box mb="s" key="pin" >
                <AddressListItem
                    iconName={'marker'}
                    iconBackground={theme.colors.primaryMain}
                    addressName={'Fijar en el mapa'}
                    city={''}
                    onPress={() => {
                        Keyboard.dismiss();
                        togglePickLocation(true);
                       
                    }}
                />
            </Box> 

        return <></>
    }


    const AbrirFavoritos = ()=>{
        if(travelState.isHotelRequest && travelState.inputAdondeVas)
        return <Box mb="s" key="favorites">
                <AddressListItem
                    iconName={'star'}
                    iconBackground={theme.colors.successMain}
                    addressName={'Mis Favoritos'}
                    city={''}
                    onPress={() => {
                        setShowFavoriteList(true);
                    }}
                />
            </Box>

    if(!travelState.isHotelRequest)
    return <Box mb="s" key="favorites">
        <AddressListItem
            iconName={'star'}
            iconBackground={theme.colors.successMain}
            addressName={'Mis Favoritos'}
            city={''}
            onPress={() => {
                setShowFavoriteList(true);
                }}
            />
        </Box>

        return <></>

    }


    return (
        <Box flex={1}>

            { travelState.isHotelRequest && !travelState.inputAdondeVas && <HotelesBotonera /> }            
            

            <AnimatedLoadingSuggestions
                show={searchingSuggestions || loading}
            />

            {(suggestionList ?? []).slice(0, 4).map((item: any) => {
                return (
                    <Box mb="s" key={item.id}>
                        <AddressListItem
                            iconName={'marker'}
                            addressName={item.address}
                            city={''}
                            onPress={() => {
                                onPress(item);
                                
                            }}
                        />
                    </Box>
                );
            })}

   
        <FijarEnElMapa />
        <AbrirFavoritos />

            

        </Box>
    );
}

function AnimatedLoadingSuggestions({ show }: any) {
    const opacity = useSharedValue(0);
    const theme = useTheme();

    const timingConfig = { duration: 600, easing: Easing.inOut(Easing.linear) };

    const showBar = useDerivedValue(() => {
        return show ? true : false;
    });

    useEffect(() => {
        opacity.value = withSequence(
            withTiming(0.2, timingConfig),
            withRepeat(withTiming(1, timingConfig), -1, true),
            withTiming(1, { ...timingConfig })
        );
    }, []);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: showBar.value ? opacity?.value : 0,
            width: '100%',
            backgroundColor: theme.colors.primaryMain,
            height: 4,
            borderRadius: 0,
            top: -20
        };
    }, []);

    return <Animated.View style={{ ...animatedStyles }}></Animated.View>;
}

function DashboardContext({ children }: any) {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'UPDATE_REQUEST':
                    return {
                        ...prevState,
                        requestData: {
                            ...(prevState.requestData
                                ? prevState.requestData
                                : {}),
                            ...action.requestData
                        }
                    };

                case 'TOGGLE_REQUEST_OPTIONS':
                    return {
                        ...prevState,
                        showRequestOptions: action.showRequestOptions
                    };

                case 'TOGGLE_REQUEST_MODAL':
                    return {
                        ...prevState,
                        showRequestModal: action.showRequestModal
                    };
                case 'TOGGLE_TRIP_DRIVER_ALERT_CARD':
                    return {
                        ...prevState,
                        showTripDriverCard: action.showTripDriverCard
                    };

                case 'SET_PRE_REQUEST_DATA':
                    return {
                        ...prevState,
                        preRequestData: action.preRequestData
                    };

                case 'RESET_REQUEST_STATE':
                    return {
                        ...prevState,
                        preRequestData: undefined,
                        requestData: undefined,
                        routeKey: undefined,
                        suggestionList: null,
                        showPickLocation: false,
                        pickLocation: {
                            origin: {},
                            stops: {
                                destination: {
                                    address: '',
                                    coords: null
                                }
                            }
                        }
                    };

                case 'TOGGLE_PICK_LOCATION':
                    return {
                        ...prevState,
                        showPickLocation: action.showPickLocation
                    };

                case 'UPDATE_ORIGIN_LOCATION':
                    return {
                        ...prevState,
                        pickLocation: {
                            ...prevState?.pickLocation,
                            origin: action.origin,
                            ...(action.origin?.valid && {
                                originValid: action.origin
                            })
                        }
                    };

                case 'UPDATE_STOP_LOCATION':
                    return {
                        ...prevState,
                        pickLocation: {
                            ...prevState?.pickLocation,
                            stops: {
                                ...prevState?.pickLocation?.stops,
                                ...action.stops
                            }
                        }
                    };

                case 'UPDATE_FOCUSED_KEY':
                    return {
                        ...prevState,
                        routeKey: action.routeKey
                    };

                case 'TOGGLE_SHOW_SUGGESTION_LIST':
                    return {
                        ...prevState,
                        showSuggestionList: action.showSuggestionList
                    };

                case 'SET_SEARCHING_SUGGESTIONS':
                    return {
                        ...prevState,
                        searchingSuggestions: action.searchingSuggestions
                    };
                case 'UPDATE_SUGGESTION_LIST':
                    return {
                        ...prevState,
                        suggestionList: action.suggestionList
                    };

                case 'DISMISS_SUGGESTION_LIST':
                    return {
                        ...prevState,
                        suggestionListDismissed: action.dismiss
                    };

                case 'REMOVE_STOP_LOCATION':
                    const newStops = ObjectUtils.omit(
                        prevState?.pickLocation?.stops,
                        action.key
                    );
                    return {
                        ...prevState,
                        pickLocation: {
                            ...prevState?.pickLocation,
                            stops: {
                                ...newStops
                            }
                        }
                    };
            }
        },
        {
            pickLocation: {
                stops: {
                    destination: {
                        coords: {
                            latitude: 0,
                            longitude: 0
                        },
                        address: ''
                    }
                }
            }
        }
    );

    return (
        <DashboardContextProvider.Provider
            value={{
                showRequestOptions: state.showRequestOptions,
                setShowRequestOptions: (show: boolean) =>
                    dispatch({
                        type: 'TOGGLE_REQUEST_OPTIONS',
                        showRequestOptions: show
                    }),

                requestData: state.requestData,
                updateRequestData: (requestData: any) => {
                    dispatch({
                        type: 'UPDATE_REQUEST',
                        requestData: requestData
                    });
                },
                routeKey: state.routeKey,
                showRequestModal: state.showRequestModal,
                setShowRequestModal: (show: boolean) =>
                    dispatch({
                        type: 'TOGGLE_REQUEST_MODAL',
                        showRequestModal: show
                    }),
                showTripDriverCard: state.showTripDriverCard,
                setShowTripDriverCard: (show: boolean) =>
                    dispatch({
                        type: 'TOGGLE_TRIP_DRIVER_ALERT_CARD',
                        showTripDriverCard: show
                    }),
                preRequestData: state.preRequestData,
                setPreRequestData: (show: boolean) =>
                    dispatch({
                        type: 'SET_PRE_REQUEST_DATA',
                        preRequestData: show
                    }),
                resetRequestState: () =>
                    dispatch({
                        type: 'RESET_REQUEST_STATE'
                    }),
                showPickLocation: state.showPickLocation,
                pickLocation: state.pickLocation,
                togglePickLocation: (show: boolean) =>
                    dispatch({
                        type: 'TOGGLE_PICK_LOCATION',
                        showPickLocation: show
                    }),
                updateOriginLocation: (data) => {
                    dispatch({
                        type: 'UPDATE_ORIGIN_LOCATION',
                        origin: data
                    });
                },
                updateStopLocation: (data) => {
                    dispatch({
                        type: 'UPDATE_STOP_LOCATION',
                        stops: data
                    });
                },
                removeStopLocation: (key: any) => {
                    dispatch({
                        type: 'REMOVE_STOP_LOCATION',
                        key: key
                    });
                },
                updateFocusedInputKey: (key: string) => {
                    dispatch({
                        type: 'UPDATE_FOCUSED_KEY',
                        routeKey: key
                    });
                },
                showSuggestionList: state.showSuggestionList,
                toggleShowSuggestionList: (show: boolean) => {
                    dispatch({
                        type: 'TOGGLE_SHOW_SUGGESTION_LIST',
                        showSuggestionList: show
                    });
                },
                dismissSuggestionList: (dismiss: boolean) => {
                    dispatch({
                        type: 'DISMISS_SUGGESTION_LIST',
                        dismiss: dismiss
                    });
                },
                suggestionListDismissed: state.suggestionListDismissed ?? true,
                searchingSuggestions: state.searchingSuggestions,
                setSearchingSuggestions: (value: boolean) => {
                    dispatch({
                        type: 'SET_SEARCHING_SUGGESTIONS',
                        searchingSuggestions: value
                    });
                },
                suggestionList: state.suggestionList,
                updateSuggestionList: (options: any[]) => {
                    dispatch({
                        type: 'UPDATE_SUGGESTION_LIST',
                        suggestionList: options
                    });
                }
            }}
        >
            {children}
        </DashboardContextProvider.Provider>
    );
}