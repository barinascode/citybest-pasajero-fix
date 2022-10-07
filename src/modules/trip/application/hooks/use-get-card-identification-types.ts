import PaymentMethodRepository from '@modules/trip/domain/repositories/payment-method-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: any[];
};

export default function useGetCardIdentificationTypes(props?: {
    enabled?: boolean;
}) {
    const notify = useNotify();
    const queryCreator = useService<QueryCreator>('QueryCreator');
    const repo = useRepository<PaymentMethodRepository>(
        'PaymentMethodRepository'
    );

    const query: Query = {
        id: 'card-identification-types',
        payload: {},
        type: 'GET'
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () =>
            repo.getIdentificationTypes().catch(() => {
                notify(
                    'No fue posible obtener los tipos de identificacion',
                    'warning'
                );
            }),
        {
            enabled: props?.enabled ?? true
        }
    );

    return queryState;
}
