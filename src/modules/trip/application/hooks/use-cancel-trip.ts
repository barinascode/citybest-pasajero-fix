import TripRepository from '@modules/trip/domain/repositories/trip-repository';
import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useCancelTrip() {
    const repo = useRepository<TripRepository>('TripRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'trip',
        payload: {},
        type: 'CANCEL'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async ({ tripId }: any) => await repo.cancelTrip(tripId),
        {}
    );

    return {
        cancel: async (tripId: string) => {
            try {
                await mutate({
                    ...mutation,
                    payload: { tripId }
                });
            } catch (error) {
                notify(
                    'No fue procesar tu solicitud. Inténtalo nuevamente',
                    'error'
                );
            }
        },
        loading: state.loading,
        loaded: state.loaded,
        data: undefined
    };
}
