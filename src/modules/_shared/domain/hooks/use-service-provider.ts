import useLogoutIfAccessDenied from '@modules/auth/application/hooks/logout-if-access-denied';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import { useMemo } from 'react';
import ServiceProviderContext from '../contexts/service-provider-context';

const useServiceProvider = () => {
    const serviceProvider =
        useContextSelector(ServiceProviderContext, (v) => v) || {};

    const logoutIfAccessDenied = useLogoutIfAccessDenied();

    const serviceProviderProxy = useMemo(() => {
        return serviceProvider;
    }, [serviceProvider, logoutIfAccessDenied]);

    return serviceProviderProxy;
};

export default useServiceProvider;
