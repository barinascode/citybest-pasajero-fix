import News from '@modules/trip/domain/models/news';
import NewsRepository from '@modules/trip/domain/repositories/news-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';

export default class GoogleNewsApiRepository
    extends CitybestAPIRepository
    implements NewsRepository
{
    async getNews(): Promise<News | null> {
        const data = await this.fetchJson('passengers/service/google-news', {
            method: 'GET',
            body: {}
        });

        if (!data?.news) return null;

        return {
            id: data.news.id,
            description: data.news.description,
            title: data.news.title,
            featureImageUrl: data.news.thumbnailUrl,
            link: data.news.link
        };
    }
}
