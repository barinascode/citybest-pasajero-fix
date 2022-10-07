import { fetchJson, queryParameters } from '../http/fetch';
import getApiUrl from '../utils/get-api-url';

interface FetchOptions {
    method: 'GET' | 'POST' | 'UPDATE' | 'DELETE';
    queryParams?: { [param: string]: any };
    body?: { [param: string]: any };
    formData?: any;
}

export default abstract class CitybestAPIRepository {
    constructor(protected tokenId: string) {}

    async fetchJson(url: string, fetchOptions: FetchOptions) {
        if (fetchOptions.method == 'GET') {
            const params = queryParameters({
                ...fetchOptions.queryParams
            });

            const response = await fetchJson(
                getApiUrl(`${url}${params ? `?${params}` : ''}`),
                {
                    method: 'GET',
                    token: this.tokenId
                }
            );
            // console.log('TOKEN ID==>', this.tokenId, response);
            return response.json;
        }

        if (fetchOptions.method == 'POST') {
            try {
                const apiurl = getApiUrl(`${url}`);
                console.log('DATA ANTES==>', fetchOptions.body);
                //console.log("DATA ACA=>",JSON.stringify(fetchOptions.body))
                //console.log("URL==>",apiurl,this.tokenId)
                const response = await fetchJson(apiurl, {
                    method: 'POST',
                    body: fetchOptions?.formData
                        ? fetchOptions?.formData
                        : JSON.stringify(fetchOptions.body),
                    token: this.tokenId
                });
                //console.log("responsefetchjson",response);
                return response.json;
            } catch (error) {
                //console.log("ERROR ACA===>",error)
            }
        }
    }

    GetTokenId() {
        return this.tokenId;
    }
}
