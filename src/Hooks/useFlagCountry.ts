import images from '@modules/_shared/domain/utils/constants/images';

export const UseFlagCoutry = (country: string) => {
    console.log('PAIS RECIBE', country);
    switch (country) {
        case 'CO':
            return images.FLAGCOLOMBIA;
        case 'MX':
            return images.FLAGMEXICO;
        case 'CL':
            return images.FLAGCHILE;
        case 'PE':
            return images.FLAGPERU;
        case 'AR':
            return images.FLAGARGENTINA;
        case 'UY':
            return images.FLAGURUGUAY;
        default:
    }
};
