import { CompletedTrip } from '@modules/trip/domain/models/completed-trip';
import TripRepository from '@modules/trip/domain/repositories/trip-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY_iso2Country } from 'config/Device/store/device.slice';


export default class APITripRepository
    extends CitybestAPIRepository
    implements TripRepository
{
    async pay(tripId: string, cardToken?: string): Promise<void> {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        const data = await this.fetchJson(`passengers/service/pay/${iso2prefix}`, {
            method: 'POST',
            body: {
                tripId: tripId,
                cardToken: cardToken
            }
        });

        return data;
    }

    async rate(tripId: string, rate: number): Promise<void> {
        const data = await this.fetchJson('passengers/service/rate', {
            method: 'POST',
            body: {
                tripId: tripId,
                rate: rate
            }
        });

        return data;
    }

    async cancelTrip(tripId: string): Promise<void> {
        const data = await this.fetchJson('passengers/service/cancel-trip', {
            method: 'POST',
            body: {
                tripId: tripId
            }
        });

        return data;
    }

    async getCompletedTrips(): Promise<CompletedTrip[]> {
        const data = await this.fetchJson('passengers/service/trips', {
            method: 'GET'
        });

        return data;
    }
}
