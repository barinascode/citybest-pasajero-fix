import { PreRequest } from '../models/pre-request';

export interface TripRequestApiDetails {
    origin: { lat: number; lng: number; address: string };
    destination: { lat: number; lng: number; address: string };
    service: string;
    paymentMethod: string;
    stops?: { lat: number; lng: number; address: string }[];
}

export default interface TripRequestRepository {
    getTripInformation(
        origin: { lat: number; lng: number; address: string },
        destination: { lat: number; lng: number; address: string }
    ): Promise<PreRequest>;
    requestTrip(props: TripRequestApiDetails): Promise<void>;
    retryRequest(): Promise<void>;
    cancelRequest(): Promise<void>;
}
