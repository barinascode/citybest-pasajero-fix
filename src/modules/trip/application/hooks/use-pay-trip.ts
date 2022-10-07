import TripRepository from '@modules/trip/domain/repositories/trip-repository';
import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function usePayTrip() {
    const repo = useRepository<TripRepository>('TripRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'trip',
        payload: {},
        type: 'PAY'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: { tripId: string; cardToken?: string }) =>
            await repo.pay(data.tripId, data.cardToken),
        {
            retry: false
        }
    );

    return {
        pay: async (tripId: string, cardToken?: string) => {
            console.log("CARDTOKEN Y TRIP===>",tripId,"----", cardToken)
            try {
                return await mutate({
                    ...mutation,
                    payload: {
                        tripId: tripId,
                        cardToken: cardToken
                    }
                });
            } catch (error) {
                /*  notify(
                    'Hubo un error al pagar el viaje. Inténtalo nuevamente o comuicate con soporte',
                    'error'
                ); */
            }
        },

        loading: state.loading,
        loaded: state.loaded,
        data: undefined,
        error: state.error
    };
}
