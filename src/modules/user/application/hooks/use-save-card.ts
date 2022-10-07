import PaymentMethodRepository from '@modules/trip/domain/repositories/payment-method-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useSaveCard() {
    const userRepo = useRepository<PaymentMethodRepository>(
        'PaymentMethodRepository'
    );

    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'user-cards',
        payload: {},
        type: 'SAVE'
    };
    const notify = useNotify();
    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: { cardToken: string }) =>{
            await userRepo.saveCard(data.cardToken)},
        {
            async onSuccess(response, queryClient) {
                notify('Tarjeta agregada', 'success');
                await queryClient.refetchQueries(
                    JSON.stringify({
                        id: 'user-cards',
                        payload: {},
                        type: 'GET'
                    })
                );
            }
        }
    );

    return {
        save: async (data: { cardToken: string }) => {
            try {
                return await mutate({
                    ...mutation,
                    payload: data
                });
            } catch (error) {
                notify(
                    'Ha ocurrido un error al agregar tu tarjeta. Intentalo más tarde',
                    'error'
                );
            }
        },

        loading: state.loading,
        loaded: state.loaded,
        error: state.error
    };
}
