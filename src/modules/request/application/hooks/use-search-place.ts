import PlaceQueryRepository from '@modules/request/domain/repositories/place-query-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Mutation from '@modules/_shared/domain/models/mutation';
import MutationCreator from '@modules/_shared/domain/services/mutation-creator';

export default function useSearchPlace(country: string) {
    const repo = useRepository<PlaceQueryRepository>('PlaceQueryRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'place',
        payload: {},
        type: 'GET'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async ({ query }) => await repo.searchPlaceByQuery(query, country),
        {}
    );

    return {
        search: async (query: string) => {
            try {
                const rs = await mutate({
                    ...mutation,
                    payload: { query }
                });
                return rs?.data;
            } catch (error) {}
        },
        loading: state.loading,
        loaded: state.loaded
    };
}
