import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import useNotify from '@shared/domain/hooks/use-notify';
import useService from '@shared/domain/hooks/use-service';
import Mutation from '@shared/domain/models/mutation';
import MutationCreator from '@shared/domain/services/mutation-creator';
import User from '../../domain/models/user';

export default function useUpdateCurrentGeoPosition() {
    const notify = useNotify();
    const mutationCreator = useService<MutationCreator>('MutationCreator');
    const { location } = useUtils();

    const mutation: Mutation = {
        id: 'update-current-geo-position',
        payload: {},
        type: ''
    };

    const [mutate, state] = mutationCreator.execute(
        mutation,
        async (data: any) => {
            return location.getCurrentPosition();
        },
        {
            async onSuccess(response, queryClient) {
                await queryClient.refetchQueries({
                    queryKey: JSON.stringify({
                        id: 'current-geo-address',
                        payload: {},
                        type: ''
                    })
                });

                await queryClient.refetchQueries({
                    queryKey: JSON.stringify({
                        id: 'current-geo-position',
                        payload: {},
                        type: ''
                    })
                });
            }
        }
    );

    return {
        update: async () => {
            try {
                await mutate({
                    ...mutation,
                    payload: {}
                });
            } catch (error) {
                //  notify('No fue posible obtener tu ubicación actual', 'warning');
            }
        },

        loading: state.loading,
        loaded: state.loaded,
        data: state.data as User | null
    };
}
