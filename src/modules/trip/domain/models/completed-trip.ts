export interface CompletedTrip {
    id: string;
    type: 'FPAY';
    driver: DriverPublicProfile;
    passengerId: string;
    requestedAt: Date;
    acceptedAt: Date;
    serviceType: string;
    origin: TripGeoPoint;
    destination: TripGeoPoint;
    finalFee: Price;
    paymentMethod: string;
}

type Price = {
    amount: number;
    currency: string;
};

type GeoCoordinates = number[];

type TripGeoPoint = {
    address: string;
    geoLocation: GeoCoordinates;
};

type DriverPublicProfile = {
    firstName: string;
    lastName: string;
    pictureUrl?: string;
};
