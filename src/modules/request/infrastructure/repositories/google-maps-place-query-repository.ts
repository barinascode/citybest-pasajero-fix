import { GOOGLE_MAPS_KEY } from '@env';
import Place from '@modules/request/domain/models/place';
import PlaceQueryRepository from '@modules/request/domain/repositories/place-query-repository';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import { fetchJson } from '@modules/_shared/infrastructure/http/fetch';

const GOOGLE_PACES_API_BASE_URL = 'https://maps.googleapis.com/maps/api/place';

export default class GoogleMapsPlaceQueryRepository
    implements PlaceQueryRepository
{
    async searchPlaceByQuery(query: string, country: string): Promise<Place[]> {
        const countryFilter = `&components=country:${'cl'}`;

        const apiUrl = `${GOOGLE_PACES_API_BASE_URL}/autocomplete/json?key=${GOOGLE_MAPS_KEY}&input=${query}${countryFilter}`;
        
        console.log('apiUrl : ', apiUrl)

        const result = await fetchJson(apiUrl, {
            method: 'POST'
        });

        const coords = await Promise.all(
            (result.json.predictions as any[]).map((place) => {
                return new Promise((resolve, reject) => {
                    getCoords(place.place_id)
                        .then((coords) => {
                            resolve({
                                id: place.place_id,
                                coords: coords
                            });
                        })
                        .catch((e) => {
                            reject(e);
                        });
                });
            })
        );

        const rs = (result.json.predictions as any[]).map((place) => {
            const itemCoords = coords.find(
                (c) => c.id === place.place_id
            ) as any;
            return {
                id: place.place_id,
                address: place.description,
                coords: itemCoords?.coords
            };
        });

        const places: Place[] = rs;

        return places;
    }
}

async function getCoords(id: string): Promise<GeoPoint | null> {
    const result = await fetchJson(
        `https://maps.googleapis.com/maps/api/geocode/json?place_id=${id}&key=${GOOGLE_MAPS_KEY}`,
        {
            method: 'GET'
        }
    );
    if (result.json.results?.length == 0) return null;

    return {
        latitude: result.json.results[0].geometry.location.lat,
        longitude: result.json.results[0].geometry.location.lng
    };
}
