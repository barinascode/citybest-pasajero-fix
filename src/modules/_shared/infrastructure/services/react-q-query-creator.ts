import useHandleServiceError from '@shared/domain/hooks/use-handle-service-error';
import ServiceError from '@shared/domain/models/service-error';
import ArrayUtils from '@shared/domain/utils/misc/array-utils';
import { useQuery as useBaseQuery, useQueryClient } from 'react-query';
import Query from '../../domain/models/query';
import QueryOptions from '../../domain/models/query-options';
import UseQueryValue from '../../domain/models/use-query-value';
import QueryCreator from '../../domain/services/query-creator';

export default class ReactQQueryCreator implements QueryCreator {
    execute(
        query: Query,
        queryFn: any,
        options: QueryOptions = { onSuccess: undefined }
    ): UseQueryValue {
        const { type, payload } = query;
        const {
            withDeclarativeSideEffectsSupport,
            retry = false,
            ...otherOptions
        } = options;
        const errorHandler = useHandleServiceError();

        const requestSignature = JSON.stringify(query);

        const {
            isLoading,
            error,
            data,
            refetch: refetchFn
        } = useBaseQuery(
            requestSignature,
            () =>
                queryFn()
                    .then((result: any) => ({
                        data: result
                    }))
                    .catch((e: Error) => {
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
                ...otherOptions,
                retry: retry

                /*  refetchOnWindowFocus: false,
        retryOnMount: false,
        refetchOnMount: false, */
                //refetchOnMount: true,
            }
        );

        const result: any = data;

        const refetch = () => {
            return refetchFn();
        };

        if (isLoading) {
            return {
                loading: true,
                total: 0,
                error: null,
                data: undefined,
                loaded: false,
                refetch
            };
        }

        return {
            loading: isLoading,
            total: ArrayUtils.isArray(result?.data)
                ? result?.data?.length
                : result?.total,
            error: error,
            data: result?.data,
            loaded: true,
            refetch
        };
    }

    async invalidateQuery(query: Query): Promise<void> {
        const queryClient = useQueryClient();
        await queryClient.invalidateQueries(JSON.stringify(query));
    }
}
