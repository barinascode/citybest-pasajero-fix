import getApiUrl from '@modules/_shared/infrastructure/utils/get-api-url';
import axios from 'axios';
export const ServiceCreateWithToken = async (
    data: any,
    route: string,
    token?: string
) => {
    const response = await axios.post(`${getApiUrl(route)}`, data, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    });
    return response.data;
};

export const ServiceUpdate = async (data: any, route: string) => {
    const response = await axios.put(`${getApiUrl(route)}`, data);
    return response.data;
};

export const ServiceCreate = async (data: any, route: string) => {
    const response = await axios.post(`${getApiUrl(route)}`, data);
    return response.data;
};
