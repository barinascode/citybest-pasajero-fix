import Place from '../models/place';

export default interface PlaceQueryRepository {
    searchPlaceByQuery(query: string, country?: string): Promise<Place[]>;
}
