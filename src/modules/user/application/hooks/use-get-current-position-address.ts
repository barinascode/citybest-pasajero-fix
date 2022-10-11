import axios from 'axios';
import useGetCurrentGeoPosition from './use-get-current-geo-position';
import useGetGeoPointAddress from './use-get-geopoint-address';

export default function useGetCurrentPositionAddress() {

    const { loading, data: position, error } = useGetCurrentGeoPosition();

   
    axios.post('http://192.168.1.12:3008',{
            body: JSON.stringify({
                'hook': 'useGetCurrentPositionAddress / useGetGeoPointAddress',
                message : '= = = SOLICITANDO : useGetCurrentPositionAddress / useGetGeoPointAddress() = = =',
            })
        })

    const { data: address, loading: loadingAddress } = useGetGeoPointAddress(
        position,
        { enabled: !!position },
        'current-geo-address'
    );


    

    axios.post('http://192.168.1.12:3008', {
        body: JSON.stringify({
            'hook': 'useGetCurrentPositionAddress',
            loading,
            position,
            address,
            loadingAddress,
        })
      });

        
    return {
        loading: loadingAddress || loading,
        data: address
    };
}
