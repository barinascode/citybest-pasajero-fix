import useGetIdentity from '@modules/auth/application/hooks/use-get-identity';
import {
    ActiveTripRoute,
    PaymentMethod,
    TripGeoPoint,
    TripMeasurement,
    TripStatus
} from '@modules/_shared/domain/models/trip-types';
import useFirebaseRealTimeDatabase from '@modules/_shared/infrastructure/firebase/use-firebase-rt-database';
import { useEffect, useState } from 'react';

const ACTIVE_TRIP_DB_REF = 'passengersActiveTrips';

interface Trip {
    id: string;
    acceptedDriver: {
        id: string;
        email?: string;
        firstName: string;
        lastName: string;
        phone: string;
        profilePictureUrl?: string;
        rating: number;
        carInfo: {
            carBrand: string;
            carModel: string;
            carYear: number;
            patent: string;
        };
    };
    requestedAt: Date;
    acceptedAt: Date;
    tripDistance: TripMeasurement;
    tripDuration: TripMeasurement;
    finalFee: {
        amount: number;
        currency: string;
    };
    status: TripStatus;
    paid: boolean;
    paymentMethod: PaymentMethod;
    routes: ActiveTripRoute[];
    requestInfo: {
        origin: TripGeoPoint;
        destination: TripGeoPoint;
        serviceType: string;
    };
    isPaid: boolean;
    isCharged: boolean;
    isRated: boolean;
}

export default function useGetActiveTrip() {
    const [trip, setTrip] = useState<Trip | null>(null);
    const db = useFirebaseRealTimeDatabase();
    const { identity } = useGetIdentity();

    const start = () => {
        db.ref(`${ACTIVE_TRIP_DB_REF}/${identity?.id}`).on(
            'value',
            (snapshot) => {
                if (!snapshot.exists()) {
                    setTrip(null);

                    return;
                }

                const data = snapshot.val();

                console.log(data)

                setTrip(data);
            }
        );
    };

    useEffect(() => {
        if (!identity) {
            return;
        }

        start();

        return () => {
            db.ref(ACTIVE_TRIP_DB_REF).off('value');
        };
    }, [identity]);

    return {
        trip
    };
}
