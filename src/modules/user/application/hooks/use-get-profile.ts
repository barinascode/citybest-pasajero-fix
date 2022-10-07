import User from '@modules/user/domain/models/user';
import UserRepository from '@modules/user/domain/repositories/user-repository';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import QueryOptions from '@modules/_shared/domain/models/query-options';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: User;
};

export default function useGetProfile(queryOptions?: QueryOptions | null) {
    const userRepo = useRepository<UserRepository>('UserRepository');
    const queryCreator = useService<QueryCreator>('QueryCreator');

    const query: Query = {
        id: 'user-profile',
        payload: {},
        type: 'GET'
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () => {
            return userRepo.getProfile();
        },
        {
            ...(queryOptions ?? {})
        }
    );

    return queryState;
}
