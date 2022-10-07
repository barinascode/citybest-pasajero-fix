import TripRequestRepository from '@modules/request/domain/repositories/trip-request-repository';
import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useRequestTrip() {
    const repo = useRepository<TripRequestRepository>('TripRequestRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'trip-request',
        payload: {},
        type: 'CREATE'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: any) => await repo.requestTrip(data),
        {}
    );

    return {
        request: async (data: any) => {
            try {
                await mutate({
                    ...mutation,
                    payload: data
                });
            } catch (error) {
                notify(
                    'No fue posible enviar tu solicitud. Inténtalo nuevamente',
                    'error'
                );
            }
        },

        loading: state.loading,
        loaded: state.loaded,
        data: undefined
    };
}
