import useFirebaseRealTimeDatabase from '@modules/_shared/infrastructure/firebase/use-firebase-rt-database';
import { useEffect, useState } from 'react';

const DRIVER_LOCATIONS_REF = 'availableDrivers';

interface DriverLocation {
    latitude: number;
    longitude: number;
}

export default function useActiveTripDriverLocation(
    driverId?: string,
    serviceType?: string
) {
    const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(
        null
    );
    const db = useFirebaseRealTimeDatabase();

    const start = (driverId: string, serviceType: string) => {
        const serviceTypeKey = serviceType.replace(/\./g, '_').toUpperCase();

        db.ref(`${DRIVER_LOCATIONS_REF}/${serviceTypeKey}/${driverId}`).on(
            'value',
            (snapshot) => {
                if (!snapshot.exists()) {
                    setDriverLocation(null);

                    return;
                }

                const data = snapshot.val();

                setDriverLocation({
                    latitude: data.l[0],
                    longitude: data.l[1]
                });
            }
        );
    };

    useEffect(() => {
        if (!driverId || !serviceType) return;

        start(driverId, serviceType);

        return () => {
            db.ref(DRIVER_LOCATIONS_REF).off('value');
        };
    }, [driverId, serviceType]);

    return {
        driverLocation
    };
}
