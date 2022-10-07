import useLogoutIfAccessDenied from '@modules/auth/application/hooks/logout-if-access-denied';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import { useMemo } from 'react';
import DataProviderContext from '../contexts/data-provider-context';

const useDataProvider = () => {
    const dataProvider = useContextSelector(DataProviderContext, (v) => v); // useContext(DataProviderContext) || {};

    const logoutIfAccessDenied = useLogoutIfAccessDenied();

    const dataProviderProxy = useMemo(() => {
        return dataProvider;
    }, [dataProvider, logoutIfAccessDenied]);

    return dataProviderProxy;
};

export default useDataProvider;
