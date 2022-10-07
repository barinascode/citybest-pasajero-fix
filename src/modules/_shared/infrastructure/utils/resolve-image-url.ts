import { BASE_URL } from '@env';

export default function resolveImageUrl(path: string) {
    if (path.indexOf('https') > -1) {
        return path;
    }
    return `${BASE_URL}/${path}`;
}
