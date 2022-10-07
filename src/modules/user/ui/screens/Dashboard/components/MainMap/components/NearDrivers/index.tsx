import Box from '@main-components/Box';
import React, { useEffect, useState } from 'react';
import useGetNearDrivers from '../../hooks/use-get-near-drivers';
import { default as NearDriverMarker } from '../NearDriverMarker';

export function NearDrivers({ origin }: any) {
    let { data: economicDrivers } = useGetNearDrivers({
        origin: [origin.latitude, origin.longitude],
        serviceType: 'city.economic',
        radius: 10.5,
        limit: 5
    });

    let { data: electricDrivers } = useGetNearDrivers({
        origin: [origin.latitude, origin.longitude],
        serviceType: 'city.electric',
        radius: 10.5,
        limit: 5
    });

    let { data: packagesDrivers } = useGetNearDrivers({
        origin: [origin.latitude, origin.longitude],
        serviceType: 'city.packages',
        radius: 10.5,
        limit: 5
    });

    let nearDrivers: any = [
        ...(economicDrivers ? Object.values(economicDrivers) : []),
        ...(electricDrivers ? Object.values(electricDrivers) : []),
        ...(packagesDrivers ? Object.values(packagesDrivers) : [])
    ];
   
    return nearDrivers ? (
        <>
            {nearDrivers.map((driver: { location: number[] }, key: number) => (
                <NearDriverMarker
                    key={key}
                    position={{
                        latitude: driver.location[0],
                        longitude: driver.location[1]
                    }}
                />
            ))}
        </>
    ) : (
        <Box />
    );
}
