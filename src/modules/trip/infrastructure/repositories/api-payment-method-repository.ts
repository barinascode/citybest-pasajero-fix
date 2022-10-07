
import PaymentMethodRepository from '@modules/trip/domain/repositories/payment-method-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';
import { fetchJson } from '@modules/_shared/infrastructure/http/fetch';
import { MP_PUBLIC_KEY } from 'MPConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultIso2Country, STORAGE_KEY_iso2Country } from 'config/Device/store/device.slice';


export default class APIPaymentMethodRepository
    extends CitybestAPIRepository
    implements PaymentMethodRepository
{
    async getIdentificationTypes(): Promise<
        {
            id: string;
            maxLength: number;
            minLength: number;
            name: string;
            type: number;
        }[]
    > {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country) || defaultIso2Country
        const data = await fetchJson(
            `https://api.mercadopago.com/v1/identification_types?public_key=${MP_PUBLIC_KEY[iso2prefix]}`,
            {
                method: 'GET'
            }
        );

        return data.json;
    }

    async getUserCards(): Promise<
        {
            id: string;
            type: string;
            lastFourDigits: string;
            firstSixDigits: string;
            thumbnail: string;
            holderName: string;
        }[]
    > {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        console.log("GET CARDS===>");
        return await this.fetchJson(`passengers/account/get-cards/${iso2prefix}`, {
            method: 'GET'
        });
    }

    async saveCard(cardToken: string): Promise<any> {
        console.log("CARD-TOKEN===>",cardToken)
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        const res = await this.fetchJson(`passengers/account/add-card/${iso2prefix}`, {
            method: 'POST',
            body: {
                token: cardToken
            }
        });
        console.log("RES===>",res)

        return res;
    }

    async deleteCard(cardId: string): Promise<any> {
        const iso2prefix = await AsyncStorage.getItem(STORAGE_KEY_iso2Country)
        const res = await this.fetchJson(`passengers/account/delete-card/${iso2prefix}`, {
            method: 'POST',
            body: {
                cardId: cardId
            }
        });

        return res;
    }
}
