import ObjectUtils from '@modules/_shared/domain/utils/misc/object-utils';
import firebase from 'firebase';
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';

const geoFire = require('geofire');

export const AVAILABLE_DRIVERS = 'availableDrivers';

export default function useGetNearDrivers({
    origin,
    serviceType,
    radius,
    limit
}: {
    origin?: number[];
    serviceType: string;
    radius: number;
    limit: number;
}) {
    const [nearDrivers, setNearDrivers] = useState<any>({});
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);

    const serviceTypeKey = serviceType.replace(/\./g, '_').toUpperCase();

    const AVAILABLE_DRIVERS_IN_SERVICE_REF = firebase
        .database()
        .ref(`${AVAILABLE_DRIVERS}/${serviceTypeKey}`);

    const geoFireInstance = new geoFire.GeoFire(
        AVAILABLE_DRIVERS_IN_SERVICE_REF
    );

    let geoQuery: any = undefined;

    const start = () => {
        geoQuery = geoFireInstance.query({
            center: origin,
            radius: radius
        });

        geoQuery.on(
            'key_entered',
            async (key: string, location: any, distance: number) => {
                if (nearDrivers >= limit) {
                    return;
                }

                setNearDrivers({
                    ...nearDrivers,
                    [key]: { location: location }
                });
            }
        );

        geoQuery.on(
            'key_exited',
            async (key: string, location: any, distance: number) => {
                setNearDrivers(
                    ObjectUtils.omitUnknown({
                        ...nearDrivers,
                        [key]: undefined
                    })
                );
            }
        );
    };

    const stop = () => {
        if (!geoQuery) {
            return;
        }

        geoQuery.cancel();
    };

    const _handleAppStateChange = (nextAppState: any) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
        ) {
            start();
        } else {
            stop();
        }

        appState.current = nextAppState;

        setAppStateVisible(appState.current);
    };

    useEffect(() => {
        var starCountRef = firebase
            .database()
            .ref(`${AVAILABLE_DRIVERS}/${serviceTypeKey}`);
        starCountRef.on('value', (snapshot) => {
            if (snapshot.val()) {
                start();
            } else {
                stop();
            }
        });

        // start();
        // AppState.addEventListener('change', _handleAppStateChange);

        // return () => {
        //     AppState.removeEventListener('change', _handleAppStateChange);
        // };
    }, []);
    return {
        data: nearDrivers
    };
}
