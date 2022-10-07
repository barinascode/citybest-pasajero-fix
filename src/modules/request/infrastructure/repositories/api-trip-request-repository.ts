import { PreRequest } from '@modules/request/domain/models/pre-request';
import TripRequestRepository, {
    TripRequestApiDetails
} from '@modules/request/domain/repositories/trip-request-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';
import { ServiceCreate } from 'Hooks/useApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEY_iso2Country } from 'config/Device/store/device.slice';



export default class APITripRequestRepository
    extends CitybestAPIRepository
    implements TripRequestRepository
{
    async getTripInformation(
        origin: { lat: number; lng: number; address: string },
        destination: { lat: number; lng: number; address: string }
    ): Promise<PreRequest> {
       
        try {
            const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
            const data = await this.fetchJson(
                `passengers/service/pre-request/${iso2prefix}`,
                {
                    method: 'POST',
                    body: {
                        origin: origin,
                        destination: destination
                    }
                }
            );
            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async requestTrip(props: TripRequestApiDetails): Promise<void> {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        const data = await this.fetchJson(`passengers/service/request/${iso2prefix}`, {
            method: 'POST',
            body: {
                origin: props.origin,
                destination: props.destination,
                service: props.service,
                stops: props.stops,
                paymentMethod: props.paymentMethod
            }
        });
        console.log("🚀 ~ file: api-trip-request-repository.ts ~ line 44 ~ requestTrip ~ data", data)

        return data;
        // let data = {
        //     origin: props.origin,
        //     destination: props.destination,
        //     service: props.service,
        //     stops: props.stops,
        //     paymentMethod: props.paymentMethod
        // };
        // console.log('data recibo', data);
        // ServiceCreate(data, `passengers/service/request/${iso2prefix}`)
        //     .then((response: any) => {
        //         console.log('response', response);
        //     })
        //     .catch((error: any) => {
        //         console.log('error', error);
        //     });
    }

    async retryRequest(): Promise<void> {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        const data = await this.fetchJson(`passengers/service/retry/${iso2prefix}`, {
            method: 'POST',
            body: {}
        });

        return data;
    }

    async cancelRequest(): Promise<void> {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        const data = await this.fetchJson(`passengers/service/cancel/${iso2prefix}`, {
            method: 'POST',
            body: {}
        });

        return data;
    }
}
