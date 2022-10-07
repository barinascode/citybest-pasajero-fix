import { API_URL } from '@env';

export default function getApiUrl(path: string) {
    console.log(API_URL);
    // console.log("path,",path)
    // console.log(`URL COMPLETA==>${API_URL}/${path}`)
    return `${API_URL}/${path}`;
}
