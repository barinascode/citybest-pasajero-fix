import TripRequestRepository from '@modules/request/domain/repositories/trip-request-repository';
import User from '@modules/user/domain/models/user';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import QueryOptions from '@modules/_shared/domain/models/query-options';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: User;
};

export default function useGetTripRequestFees(
    origin?: { lat: number; lng: number; address: string },
    destination?: { lat: number; lng: number; address: string },
    stops?: { lat: number; lng: number; address: string }[],
    queryOptions?: QueryOptions | null
) {
    const repo = useRepository<TripRequestRepository>('TripRequestRepository');
    const queryCreator = useService<QueryCreator>('QueryCreator');

    const query: Query = {
        id: 'trip-request-fees',
        payload: {
            origin,
            destination,
            stops
        },
        type: 'GET'
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () => {
            return repo.getTripInformation(origin, destination);
        },
        {
            ...(queryOptions ?? {})
        }
    );

    return queryState;
}
