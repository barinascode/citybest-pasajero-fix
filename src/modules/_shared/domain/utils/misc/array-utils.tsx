import {
    differenceWith as LDifferenceWith,
    filter as lFilter,
    find as LFind,
    findIndex,
    groupBy as LGroupBy,
    isArray as LIsArray,
    isEqual as lIsEqual,
    orderBy as LOrderBy
} from 'lodash';

const ArrayUtils = {
    groupBy: LGroupBy,
    orderBy: LOrderBy,
    isArray: LIsArray,
    isEqual: lIsEqual,
    filter: lFilter,
    find: LFind,
    differenceWith: LDifferenceWith,
    combine(arr1: any[], arr2: any[]) {
        return arr1.map((e, i) => {
            return { ...e, ...arr2[i] };
        });
    },
    replaceByKey: (arr: any[], newValue: any, keyName: string) => {
        const copy = [...arr];
        var index = findIndex(arr, (e) => e[keyName] == newValue[keyName]);

        if (index <= -1) return arr;

        if (copy[index]) {
            copy[index] = newValue;
        } else {
            copy.push(newValue);
        }

        return copy;
    },
    replaceWhere<T = any>(
        arr: T[],
        condition: (params: T) => boolean,
        newValue: any
    ) {
        const copy = [...arr];
        var index = findIndex(arr, condition);

        if (index <= -1) return arr;

        if (copy[index]) {
            copy[index] = newValue;
        } else {
            copy.push(newValue);
        }

        return copy;
    }
};

export default ArrayUtils;
