import PaymentMethodRepository from '@modules/trip/domain/repositories/payment-method-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useDeleteCard() {
    const userRepo = useRepository<PaymentMethodRepository>(
        'PaymentMethodRepository'
    );

    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'user-cards',
        payload: {},
        type: 'DELETE'
    };

    const notify = useNotify();
    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: { cardId: string }) =>
            await userRepo.deleteCard(data.cardId),
        {
            async onSuccess(response, queryClient) {
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
        deleteCard: async (data: { cardId: string }) => {
            try {
                await mutate({
                    ...mutation,
                    payload: data
                });

                notify('Tarjeta eliminada', 'success');
            } catch (error) {
                notify(
                    'Ha ocurrido un error al eliminar tu tarjeta. Intentalo más tarde',
                    'error'
                );
            }
        },

        loading: state.loading,
        loaded: state.loaded
    };
}
