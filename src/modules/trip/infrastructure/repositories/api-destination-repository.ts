import { TripDestination } from '@modules/trip/domain/models/trip-destination';
import DestinationRepository from '@modules/trip/domain/repositories/destination-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';

export default class APIDestinationRepository
    extends CitybestAPIRepository
    implements DestinationRepository
{
    async getFavorites(): Promise<TripDestination[]> {
        const data = await this.fetchJson(
            'passengers/service/favorite-destinations',
            {
                method: 'GET'
            }
        );

        return data;
    }

    async addLastTripDestination(): Promise<any> {
        const data = await this.fetchJson('passengers/service/save-favorite', {
            method: 'POST',
            body: {}
        });

        return data;
    }

    async getRecent(): Promise<TripDestination[]> {
        const data = await this.fetchJson(
            'passengers/service/favorite-destinations',
            {
                method: 'GET'
            }
        );

        return data;
    }
}
