export default interface UseQueryValue<T = any> {
    data?: T;
    total?: number;
    error?: any;
    loading: boolean;
    loaded: boolean;
    refetch: () => any;
}
