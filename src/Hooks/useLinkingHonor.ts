export const UseLinkingHonor = (countryCode: string) => {
    let baseURL = 'https://www.hihonor.com/co/';

    switch (countryCode) {
        case 'CO':
            baseURL = 'https://www.hihonor.com/co/';
            break;
        case 'CL':
            baseURL = 'https://www.hihonor.com/cl/';
            break;
        case 'MX':
            baseURL = 'https://www.hihonor.com/mx/';
            break;
        case 'PE':
            baseURL = 'https://www.hihonor.com/pe/';
            break;
        case 'VE':
            baseURL = 'https://www.hihonor.com/ve/';
            break;
        case 'EC':
            baseURL = 'https://www.hihonor.com/ec/';
            break;
        case 'BR':
            baseURL = 'https://www.hihonor.com/br/';
            break;
        case 'AR':
            baseURL = 'https://www.hihonor.com/ar/';
            break;
        case 'BO':
            baseURL = 'https://www.hihonor.com/bo/';
            break;
    }

    return baseURL;
};
