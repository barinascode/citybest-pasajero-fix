import getApiUrl from '@modules/_shared/infrastructure/utils/get-api-url';

export default function useIsDev() {
    return getApiUrl('/').indexOf('192.') > -1;
}
