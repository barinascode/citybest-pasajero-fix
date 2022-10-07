import NumberUtils from '@shared/domain/utils/misc/number-utils';

export const bsFormat = (value: number) => {
    return `Bs.S ${NumberUtils.format(value, '0.0[,]00')}`;
};

export const bsAbbr = 'Bs.S';

export const usdFormat = (value: number) => {
    return `USD ${NumberUtils.format(value, '0.0[,]00')}`;
};

export const usdAbbr = 'USD';
