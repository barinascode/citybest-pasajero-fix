import {
    isNil,
    isNull as LIsNull,
    mapValues as LMapValues,
    omit as LOmit,
    omitBy
} from 'lodash';
import fnGet from 'lodash/get';

const ObjectUtils = {
    get: fnGet,
    isNull: LIsNull,
    omit: LOmit,
    mapValues: LMapValues,
    sort(obj: any) {
        return Object.keys(obj)
            .sort((e: string, i: string) => {
                return e > i ? 0 : 1;
            })
            .reduce(function (result, key) {
                // @ts-ignore
                result[key] = obj[key];
                return result;
            }, {});
    },
    omitUnknown: (object: any) => {
        return omitBy(object, isNil);
    }
};

export default ObjectUtils;
