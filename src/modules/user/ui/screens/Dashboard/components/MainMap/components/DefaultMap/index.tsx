import Box from '@main-components/Box';
import FullScreenMap, { MapView } from '@main-components/FullScreenMap';
import Text from '@main-components/Text';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import AppLoading from 'expo-app-loading';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultMapState } from '../DefaultMapState';
import MapOptions from '../MapOptions';
import { RouteDirections } from '../RouteDirections';
// import { PulseLoader} from 'react-native-indicator';

export function DefaultMap(props: any) {
    const mapRef = useRef<MapView | null>(null);
    const { location } = useUtils();
    const markerRef = useRef(null);
    const destMarkerRef = useRef(null);
    const stopMarkerRef = useRef(null);

    const { requestDestination } = useDashboardContextProvider((state) => ({
        requestDestination: state.requestData
            ? {
                latitude: state.requestData.destination?.coords?.latitude,
                longitude: state.requestData.destination?.coords?.longitude,
                address: state.requestData.destination?.address
            }
            : null
    }));

    const { stop } = useDashboardContextProvider((state) => ({
        stop:
            state.requestData && state.requestData.stops
                ? {
                    latitude: state.requestData.stops[0]?.coords?.latitude,
                    longitude: state.requestData.stops[0]?.coords?.longitude,
                    address: state.requestData.stops[0]?.address
                }
                : undefined
    }));

    const { requestOrigin } = useDashboardContextProvider((state) => ({
        requestOrigin: state.requestData
            ? {
                latitude: state.requestData.origin?.coords?.latitude,
                longitude: state.requestData.origin?.coords?.longitude,
                address: state.requestData.origin?.address
            }
            : null
    }));

    const { tripDuration } = useDashboardContextProvider((state) => ({
        tripDuration: state.requestData
            ? state.preRequestData.tripDuration
            : null
    }));

    const onRegionChangeComplete = () => {
        if (markerRef && markerRef.current && markerRef.current.showCallout) {
            markerRef.current.showCallout();
        }

        if (
            destMarkerRef &&
            destMarkerRef.current &&
            destMarkerRef.current.showCallout
        ) {
            destMarkerRef.current.showCallout();
        }
    };

    function renderMapMode() {
        if (requestDestination) {
            return (
                <RouteDirections
                    mapRef={mapRef}
                    origin={requestOrigin}
                    destination={{
                        ...requestDestination,
                        duration: tripDuration
                    }}
                    stop={stop}
                    markersRefs={
                        stop?.address
                            ? [markerRef, destMarkerRef, stopMarkerRef]
                            : [markerRef, destMarkerRef]
                    }
                />
            );
        }

        return <DefaultMapState mapRef={mapRef} />;
    }

    const [initialRegion, setinitialRegion] = useState({})
    useEffect(() => {
        location.getCurrentPosition().then((res) => {
            let { latitude, longitude } = res;
            setinitialRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        })
    }, [location]);
    if (Object.keys(initialRegion).length == 0) {
        return (
            <Box style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 50,
                backgroundColor: '#fff'
            }}>
                {/* <PulseLoader size={80} color="#441A7B" /> */}
            </Box>
        )
    }

    return (
        <>
            <FullScreenMap
                onRegionChangeComplete={onRegionChangeComplete}
                ref={mapRef}
                onRegionChange={() => {
                    props.onRegionChange();
                }}
                initialRegion={initialRegion}
            >
                {renderMapMode()}
            </FullScreenMap>

            <MapOptions />
        </>
    );
}
