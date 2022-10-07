import PaymentMethodRepository from '@modules/trip/domain/repositories/payment-method-repository';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import QueryOptions from '@modules/_shared/domain/models/query-options';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: any;
};

export default function useGetCards(queryOptions?: QueryOptions | null) {
    const userRepo = useRepository<PaymentMethodRepository>(
        'PaymentMethodRepository'
    );
    const queryCreator = useService<QueryCreator>('QueryCreator');

    const query: Query = {
        id: 'user-cards',
        payload: {},
        type: 'GET'
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () => {
            return userRepo.getUserCards();
        },
        {
            ...(queryOptions ?? {})
        }
    );

    return queryState;
}
