import { CompletedTrip } from '@modules/trip/domain/models/completed-trip';
import TripRepository from '@modules/trip/domain/repositories/trip-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: CompletedTrip[];
};

export default function useGetCompletedTrips(props?: { enabled?: boolean }) {
    const notify = useNotify();
    const queryCreator = useService<QueryCreator>('QueryCreator');
    const repo = useRepository<TripRepository>('TripRepository');

    const query: Query = {
        id: 'completed-trips',
        payload: {},
        type: 'GET'
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () =>
            repo.getCompletedTrips().catch(() => {
                notify('No fue posible obtener tus viajes', 'warning');
            }),
        {
            enabled: props?.enabled ?? true
        }
    );

    return queryState;
}
