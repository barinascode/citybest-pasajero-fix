import Mutation from './mutation';
import MutationOptions from './mutation-options';

export type UseMutationValue<T = any> = [
    (query?: Partial<Mutation>, options?: Partial<MutationOptions>) => any,
    {
        data?: T;
        total?: number;
        error?: any;
        loading: boolean;
        loaded: boolean;
    }
];
