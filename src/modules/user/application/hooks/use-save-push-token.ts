import User from '@modules/user/domain/models/user';
import UserRepository from '@modules/user/domain/repositories/user-repository';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';

export default function useSavePushToken() {
    const userRepo = useRepository<UserRepository>('UserRepository');

    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'push-token',
        payload: {},
        type: 'SAVE'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: { token: string }) =>
            await userRepo.savePushToken(data.token),
        {}
    );

    return {
        save: async (data: { token: string }) => {
            try {
                await mutate({
                    ...mutation,
                    payload: data
                });
            } catch (error) {}
        },

        loading: state.loading,
        loaded: state.loaded,
        data: state.data as User | null
    };
}
