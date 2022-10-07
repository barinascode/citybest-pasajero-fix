import User from '@modules/user/domain/models/user';
import UserRepository from '@modules/user/domain/repositories/user-repository';
import useNotify from '@shared/domain/hooks/use-notify';
import useRepository from '@shared/domain/hooks/use-repository';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';
/* 
type UserProfileMutationValue = Omit<UseMutationValue> & {
  data?: User;
}; */

export default function useSaveProfile({ notifyOnSucceed = true }) {
    const userRepo = useRepository<UserRepository>('UserRepository');
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');

    const mutation: Mutation = {
        id: 'user-profile',
        payload: {},
        type: 'UPDATE'
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: Partial<User>) => await userRepo.saveProfile(data),
        {
            async onSuccess(response, queryClient) {
                await queryClient.refetchQueries(
                    JSON.stringify({
                        id: 'user-profile',
                        payload: {},
                        type: 'GET'
                    })
                );
            }
        }
    );

    return {
        save: async (user: Partial<User>) => {
            try {
                await mutate({
                    ...mutation,
                    payload: user
                });

                if (notifyOnSucceed) {
                    notify(
                        'Tu perfil ha sido actualizado exitosamente',
                        'success'
                    );
                }
            } catch (error) {
                notify(
                    'No fue posible guardar tu perfil. Inténtalo nuevamente',
                    'error'
                );
            }
        },

        loading: state.loading,
        loaded: state.loaded,
        data: state.data as User | null
    };
}
