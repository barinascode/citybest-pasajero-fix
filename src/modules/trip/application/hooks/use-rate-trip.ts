import TripRepository from '@modules/trip/domain/repositories/trip-repository';
import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useRateTrip() {
    const repo = useRepository<TripRepository>('TripRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'trip',
        payload: {},
        type: 'RATE'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: { tripId: string; rate: number }) =>
            await repo.rate(data.tripId, data.rate),
        {
            async onSuccess(response, queryClient) {
                await queryClient.invalidateQueries({
                    queryKey: JSON.stringify({
                        id: 'completed-trips',
                        payload: {},
                        type: 'GET'
                    })
                });
            }
        }
    );

    return {
        rate: async (tripId: string, rate: number) => {
            try {
                await mutate({
                    ...mutation,
                    payload: {
                        tripId: tripId,
                        rate: rate
                    }
                });
            } catch (error) {
                notify(
                    'Hubo un error al calificar el viaje. Inténtalo nuevamente',
                    'error'
                );
                throw new Error('RATING_NOT_SENT');
            }
        },

        loading: state.loading,
        loaded: state.loaded,
        data: undefined
    };
}
