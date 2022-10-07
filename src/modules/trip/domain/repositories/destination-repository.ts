import { TripDestination } from '../models/trip-destination';

export default interface DestinationRepository {
    getFavorites(): Promise<TripDestination[]>;
    addLastTripDestination(): Promise<any>;
    getRecent(): Promise<TripDestination[]>;
}
