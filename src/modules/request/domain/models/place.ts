import GeoPoint from '@modules/_shared/domain/models/geo-point';

export default interface Place {
    id: string;
    address: string;
    city?: string;
    country?: string;
    coords?: GeoPoint;
}
