import { QueryClient } from 'react-query';

export default interface MutationOptions {
    action?: string;
    undoable?: boolean;
    onSuccess?: (response: any, queryClient: QueryClient) => any | Object;
    onFailure?: (error?: any) => any | Object;
    withDeclarativeSideEffectsSupport?: boolean;
    retry?: boolean;
}
