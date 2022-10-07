import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import FullScreenMap, { MapView } from '@main-components/FullScreenMap';
import Text from '@main-components/Text';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import Region from '@modules/_shared/domain/models/region';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React, { useEffect, useRef, useState } from 'react';
import { DefaultMap } from './components/DefaultMap';
import { DefaultMapState } from './components/DefaultMapState';
import MapOptions from './components/MapOptions';
import { TripMap } from './components/TripMap';


export default function MainMap() {
    const { trip } = useGetActiveTrip();

    const {
        shouldShowPicker,
        togglePickLocation,
        showRequestModal,
        showPickLocation,
        toggleShowSuggestionList,
    } = useDashboardContextProvider((state) => ({
        shouldShowPicker: state.showPickLocation && state.showRequestModal,
        togglePickLocation: state.togglePickLocation,
        showPickLocation: state.showPickLocation,
        showRequestModal: state.showRequestModal,
        toggleShowSuggestionList: state.toggleShowSuggestionList
    }));

    if (shouldShowPicker) {
        return <PickerMap />;
    }

    if (trip) {
        return <TripMap />;
    }

    return (
        <DefaultMap
            onRegionChange={() => {
                if (!showPickLocation && showRequestModal) {
                    toggleShowSuggestionList(false)
                }
            }}
        />
    );
}

function PickerMap() {
    const mapRef = useRef<MapView | null>(null);

    const { location } = useUtils();

    const theme = useTheme();

    const {
        updateOriginLocation,
        updateStopLocation,
        routeKey,
        updateFocusedInputKey,
        togglePickLocation
    } = useDashboardContextProvider((state) => ({
        routeKey: state.routeKey,
        updateOriginLocation: state.updateOriginLocation,
        updateStopLocation: state.updateStopLocation,
        updateFocusedInputKey: state.updateFocusedInputKey,
        togglePickLocation: state.togglePickLocation
    }));

    async function onRegionPickerChangeComplete(coords: any) {
        const address = await location.getPositionAddress(coords);
        const parts = [
            address.shortAddress,
            address.city ?? '',
            address.street ?? ''
            //address.country
        ]
            .filter((e) => e !== '')
            .join(', ');
        const currentKey = routeKey ?? 'destination';

        if (currentKey == 'origin') {
            updateOriginLocation({
                address: parts,
                coords,
                valid: true
            });
            return;
        }

        updateStopLocation({
            [currentKey]: {
                address: parts,
                coords
            }
        });
    }


    // const initialRegion: Region = {
    //     latitude: 0, //-12.04318,
    //     longitude: 0, //-77.02824,
    //     latitudeDelta: 0,
    //     longitudeDelta: 0
    // };
    const [initialRegion, setInitialRegion] = useState<Region>({
        latitude: 0, //-12.04318,
        longitude: 0, //-77.02824,
        latitudeDelta: 0,
        longitudeDelta: 0

    })

    useEffect(()=>{
        location.getCurrentPosition().then((res)=>{
            let {latitude,longitude} = res;
            setInitialRegion({
                latitude,
                longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            })
        })
    }, [location]);
    
   
    return (
        <Box flex={1}>
            <FullScreenMap
                onRegionChangeComplete={onRegionPickerChangeComplete}
                ref={mapRef}
                initialRegion={initialRegion}
            >
                <DefaultMapState mapRef={mapRef} animate={false} />
            </FullScreenMap>

            <Box style={{ position: 'absolute', left: '50%', top: '50%' }}>
                <AppIcon
                    name="pin"
                    size={40}
                    color={theme.colors.primaryMain}
                />
            </Box>

            <Box
                width="100%"
                justifyContent="center"
                zIndex={99999999}
                position={'absolute'}
                bottom={40}
            >
                <Box marginHorizontal="m">
                    <Button
                        title="Listo"
                        onPress={() => {
                            togglePickLocation(false);
                        }}
                    />
                </Box>
            </Box>
            <MapOptions />
        </Box>
    );
}
