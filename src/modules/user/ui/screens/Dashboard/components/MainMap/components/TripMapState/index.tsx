import { MapView } from '@main-components/FullScreenMap';
import React, { MutableRefObject } from 'react';
import { TripMaker } from '../TripMarker';

export function TripMapState({
    mapRef,
    animate = true,
    carPosition
}: {
    mapRef: MutableRefObject<MapView | null>;
    animate?: boolean;
    carPosition: any;
}) {

    return (
        <>
            {carPosition && (
                <TripMaker
                    mapRef={mapRef}
                    key={'driving-car.trip'}
                    position={{
                        latitude: carPosition.latitude,
                        longitude: carPosition.longitude
                    }}
                />
            )}
        </>
    );
}
