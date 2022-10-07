import { CompletedTrip } from '../models/completed-trip';

export default interface TripRepository {
    pay(tripId: string, cardToken?: string): Promise<void>;
    rate(tripId: string, rate: number): Promise<void>;
    getCompletedTrips(): Promise<CompletedTrip[]>;
}
