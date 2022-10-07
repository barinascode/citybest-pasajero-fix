export default interface QueryOptions {
    action?: string;
    onSuccess?: (response: any) => any | Object;
    onFailure?: (error?: any) => any | Object;
    withDeclarativeSideEffectsSupport?: boolean;
    enabled?: boolean;
    cacheTime?: number;
    retry?: boolean;
}
