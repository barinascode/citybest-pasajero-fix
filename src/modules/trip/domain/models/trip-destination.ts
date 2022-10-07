export interface TripDestination {
    id: string;
    place: {
        address: string;
        geoLocation: number[];
    };
}
