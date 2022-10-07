import News from '../models/news';

export default interface NewsRepository {
    getNews(): Promise<News | null>;
}
