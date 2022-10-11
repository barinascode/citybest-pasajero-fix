import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useService from '@modules/_shared/domain/hooks/use-service';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import Query from '@modules/_shared/domain/models/query';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';
import axios from 'axios';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: GeoPoint;
};
export default function useGetCurrentGeoPosition(props?: {
    enabled?: boolean;
}) {
    const { location } = useUtils();

    const notify = useNotify();
    const queryCreator = useService<QueryCreator>('QueryCreator');

    const query: Query = {
        id: 'current-geo-position',
        payload: {},
        type: ''
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () =>
            location.getCurrentPosition().catch((error) => {
                
               
                axios.post('http://192.168.1.12:3008',{
                    body: JSON.stringify({
                        'hook': 'useGetGeoPointAddress',
                        'notify': 'No fue posible obtener tu ubicación actual',
                        error
                    })
                });
                

       

                notify(
                    'No fue posible obtener tu ubicación actual',
                    'warning',
                    null,
                    false,
                    undefined,
                    {
                        label: 'Reintentar',
                        onPress: () => {
                            queryState.refetch();
                        }
                    }
                );
            }),
        {
            enabled: props?.enabled ?? true,
            cacheTime: 0
        }
    );

    return queryState;
}
