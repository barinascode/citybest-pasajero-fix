import { TripDestination } from '@modules/trip/domain/models/trip-destination';
import DestinationRepository from '@modules/trip/domain/repositories/destination-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: TripDestination[];
};

export default function useGetFavoriteDestinations(
    querySearch?: string,
    props?: {
        enabled?: boolean;
    }
) {
    const notify = useNotify();
    const queryCreator = useService<QueryCreator>('QueryCreator');
    const repo = useRepository<DestinationRepository>('DestinationRepository');

    const query: Query = {
        id: 'favorite-destinations',
        payload: {},
        type: 'GET'
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        async () => {
            try {
                const result = await repo.getFavorites();

                if (querySearch) {
                    return result.filter((dest) => {
                        return dest.place.address.match(
                            new RegExp(`/^.*${querySearch}$/`)
                        );
                    });
                }
                return result;
            } catch (error) {
                notify(
                    'No fue posible obtener tus destinos favoritos',
                    'warning'
                );
            }
        },
        {
            enabled: props?.enabled ?? true
        }
    );

    return queryState;
}
