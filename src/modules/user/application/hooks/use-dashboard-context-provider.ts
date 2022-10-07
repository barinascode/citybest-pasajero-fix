import DashboardContextProvider, {
    DashboardContextProviderProps
} from '@modules/user/ui/context/DashboardContext';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import { useMemo } from 'react';

const useDashboardContextProvider = (selector?: (state: any) => any) => {
    const defaultSelector = (v) => v;
    const provider: DashboardContextProviderProps & { [prop: string]: any } =
        useContextSelector(
            DashboardContextProvider,
            selector || defaultSelector
        ) || {};

    const providerProxy = useMemo(() => {
        return provider;
    }, [provider]);

    return providerProxy;
};

export default useDashboardContextProvider;
