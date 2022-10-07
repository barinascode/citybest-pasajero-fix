import useGetCurrentGeoPosition from './use-get-current-geo-position';
import useGetGeoPointAddress from './use-get-geopoint-address';

export default function useGetCurrentPositionAddress() {
    const { loading, data: position, error } = useGetCurrentGeoPosition();

    const { data: address, loading: loadingAddress } = useGetGeoPointAddress(
        position,
        { enabled: !!position },
        'current-geo-address'
    );

    return {
        loading: loadingAddress || loading,
        data: address
    };
}
