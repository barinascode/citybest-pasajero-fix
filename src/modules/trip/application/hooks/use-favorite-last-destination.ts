import DestinationRepository from '@modules/trip/domain/repositories/destination-repository';
import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useFavoriteLastDestination() {
    const repo = useRepository<DestinationRepository>('DestinationRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'favorite-destinations',
        payload: {},
        type: 'SAVE'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: any) => await repo.addLastTripDestination(),
        {
            async onSuccess(response, queryClient) {
                await queryClient.invalidateQueries({
                    queryKey: JSON.stringify({
                        id: 'favorite-destinations',
                        payload: {},
                        type: 'GET'
                    })
                });
            }
        }
    );

    return {
        save: async () => {
            try {
                return await mutate({
                    ...mutation,
                    payload: {}
                });
            } catch (error) {}
        },

        loading: state.loading,
        loaded: state.loaded,
        data: undefined,
        error: state.error
    };
}
