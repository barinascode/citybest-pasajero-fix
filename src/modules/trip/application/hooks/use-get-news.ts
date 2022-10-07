import News from '@modules/trip/domain/models/news';
import NewsRepository from '@modules/trip/domain/repositories/news-repository';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import useService from '@modules/_shared/domain/hooks/use-service';
import Query from '@modules/_shared/domain/models/query';
import UseQueryValue from '@modules/_shared/domain/models/use-query-value';
import QueryCreator from '@modules/_shared/domain/services/query-creator';

type ResponseQueryValue = Omit<UseQueryValue, 'data'> & {
    data?: News;
};

export default function useGetNews(props?: { enabled?: boolean }) {
    const notify = useNotify();
    const queryCreator = useService<QueryCreator>('QueryCreator');
    const repo = useRepository<NewsRepository>('NewsRepository');

    const query: Query = {
        id: 'news',
        payload: {},
        type: ''
    };

    const queryState: ResponseQueryValue = queryCreator.execute(
        query,
        () =>
            repo.getNews().catch(() => {
                notify('No fue posible obtener las noticias', 'warning');
            }),
        {
            enabled: props?.enabled ?? true
        }
    );

    return queryState;
}
