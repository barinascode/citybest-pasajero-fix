import useServiceProvider from './use-service-provider';

export default function useService<T>(serviceName: string) {
    const serviceProvider = useServiceProvider();

    if (!serviceProvider[serviceName]) {
        throw new Error(`${serviceName} is not injected in App provider`);
    }

    return serviceProvider[serviceName] as T;
}
