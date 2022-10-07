import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import { useEffect } from 'react';
import AuthProviderContext from '../../domain/contexts/auth-provider-context';
import useCheckAuth from './use-check-auth';

interface State {
    isLoading: boolean;
    isLoggedIn?: boolean;
    userToken?: string;
}

const emptyParams = {};

const useAuthState = (params: any = emptyParams): State => {
    const { state, dispatch } = useContextSelector(
        AuthProviderContext,
        (v) => v
    );

    const checkAuth = useCheckAuth();

    if (!state) {
        throw new Error('Provider not started');
    }

    useEffect(() => {
        checkAuth(params, false)
            .then((token) => dispatch({ type: 'RESTORE_TOKEN', token: token }))
            .catch(() => dispatch({ type: 'RESTORE_TOKEN', token: null }));
    }, [checkAuth, params, dispatch]);

    return state;
};

export default useAuthState;
