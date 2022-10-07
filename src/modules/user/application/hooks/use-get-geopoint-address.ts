import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useService from '@modules/_shared/domain/hooks/use-service';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import LocationAddress from '@modules/_shared/domain/models/location-address';
import Query from '@modules/_shared/domain/models/query';
import QueryOptions from '@modules/_shared/domain/models/query-options';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: LocationAddress;
};

export default function useGetGeoPointAddress(
    point?: GeoPoint | null,
    queryOptions: QueryOptions | null,
    key?: string
) {
    const { location } = useUtils();

    const notify = useNotify();
    const queryCreator = useService<QueryCreator>('QueryCreator');

    const query: Query = {
        id: key || 'geo-address',
        payload: {},
        type: ''
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () => {
            if (!point) return Promise.resolve();
            return location.getPositionAddress(point).catch(() => {
                notify(
                    'No fue posible obtener información de la ubicación',
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
            });
        },
        {
            cacheTime: 0,
            ...queryOptions
        }
    );

    return queryState;
}
