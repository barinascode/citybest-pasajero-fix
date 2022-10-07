import useGetIdentity from '@modules/auth/application/hooks/use-get-identity';
import {
    PaymentMethod,
    RequestInfo,
    TripMeasurement,
    TripRequestStatus
} from '@modules/_shared/domain/models/trip-types';
import useFirebaseRealTimeDatabase from '@modules/_shared/infrastructure/firebase/use-firebase-rt-database';
import { useEffect, useState } from 'react';

const TRIP_REQUESTS_DB_REF = 'tripRequests';

interface TripRequest {
    currentAttempt: {
        number: number;
        radius: number;
    };
    requestInfo: RequestInfo;
    tripDistance: TripMeasurement;
    tripDuration: TripMeasurement;
    finalFee: {
        amount: number;
        currency: string;
    };
    status: TripRequestStatus;
    paymentMethod: PaymentMethod;
    date: Date;
}

export default function useGetActiveTripRequest() {
    const [request, setRequest] = useState<TripRequest | null>(null);
    const db = useFirebaseRealTimeDatabase();
    const { identity } = useGetIdentity();

    const start = () => {
        db.ref(`${TRIP_REQUESTS_DB_REF}/${identity?.id}`).on(
            'value',
            (snapshot) => {
                if (!snapshot.exists()) {
                    setRequest(null);
                    return;
                }

                const data = snapshot.val();

                setRequest(data);
            }
        );
    };

    useEffect(() => {
        if (!identity) {
            return;
        }

        start();

        return () => {
            db.ref(TRIP_REQUESTS_DB_REF).off('value');
        };
    }, [identity]);

    return {
        request
    };
}
