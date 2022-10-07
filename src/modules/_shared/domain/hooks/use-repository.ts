import useDataProvider from './use-data-provider';

export default function useRepository<T>(repoName: string) {
    const dataProvider = useDataProvider();

    if (!dataProvider[repoName]) {
        throw new Error(`${repoName} is not injected in App provider`);
    }

    return dataProvider[repoName] as T;
}
