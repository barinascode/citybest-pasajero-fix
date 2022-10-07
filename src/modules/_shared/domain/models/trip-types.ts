export type GeoCoordinates = number[];

export type TripStatus =
    | 'ACCEPTED'
    | 'PICKING_UP'
    | 'ON_THE_WAY_TO_DESTINATION'
    | 'ARRIVED_TO_DESTINATION'
    | 'FINISHED'
    | 'CANCELED_BY_DRIVER'
    | 'CANCELED_BY_PASSENGER'
    | 'ROUTE_COMPLETED';

export type TripRequestStatus =
    | 'SEARCHING'
    | 'DRIVERS_NOT_FOUND_IN_ATTEMPT'
    | 'NOT_FOUND_MAX_ATTEMPTS_REACHED'
    | 'ACCEPTED'
    | 'CANCELED';

export type TripMeasurement = {
    value: number;
    text: string;
};

export type PaymentMethod = 'CASH' | 'CREDIT.CARD' | 'QR';

export type TripGeoPoint = {
    address: string;
    geoLocation: GeoCoordinates;
};

export type ActiveTripRoute = {
    origin: TripGeoPoint;
    destination: TripGeoPoint;
    distance: TripMeasurement;
    duration: TripMeasurement;
    completed: boolean;
};

export type RequestInfo = {
    origin: TripGeoPoint;
    destination: TripGeoPoint;
    serviceType: string;
};
