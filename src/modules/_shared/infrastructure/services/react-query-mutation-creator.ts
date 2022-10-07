import useHandleServiceError from '@shared/domain/hooks/use-handle-service-error';
import Mutation from '@shared/domain/models/mutation';
import MutationOptions from '@shared/domain/models/mutation-options';
import ServiceError from '@shared/domain/models/service-error';
import { UseMutationValue } from '@shared/domain/models/use-mutation-value';
import MutationCreator from '@shared/domain/services/mutation-creator';
import { useMutation as useBaseMutation, useQueryClient } from 'react-query';

export default class ReactQueryMutationCreator implements MutationCreator {
    execute(
        query: Mutation,
        queryFn: any,
        options?: MutationOptions
    ): UseMutationValue {
        const key = JSON.stringify(query);
        const queryClient = useQueryClient();
        const errorHandler = useHandleServiceError();

        const mutation = useBaseMutation(
            (data) =>
                queryFn(data)
                    .then(async (result: any) => {
                        return {
                            data: result,
                            params: data
                        };
                    })
                    .catch((e: Error) => {
                        options?.onFailure && options.onFailure(data);
                        errorHandler.handle(
                            new ServiceError(
                                e.message == 'Network request failed'
                                    ? 'NETWORK_ERROR'
                                    : e.message,
                                ''
                            )
                        );
                    }),
            {
                mutationKey: key,
                ...options,
                onError: () => {
                    options?.onFailure && options.onFailure();
                },
                onSuccess: (response) => {
                    options?.onSuccess &&
                        options.onSuccess(response, queryClient);
                }
            }
        );

        const mutateFunction = async (
            query?: Partial<Mutation>,
            options?: Partial<MutationOptions>
        ): Promise<any> => {
            const data: any = query?.payload || [];
            return mutation.mutateAsync(data);
        };

        const initialResult = {
            data: null,
            error: null,
            total: 0,
            loading: true,
            loaded: false
        };

        if (mutation.isLoading) {
            return [mutateFunction, initialResult];
        }

        const result = mutation;

        return [
            mutateFunction,
            {
                total: (result as any)?.total,
                data: (result as any)?.data,
                error: mutation.error,
                loading: mutation.isLoading,
                loaded: true
            }
        ];
    }
}
