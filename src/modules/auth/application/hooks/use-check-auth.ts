import { useCallback } from 'react';
import useAuthProvider from './use-auth-provider';
import useLogout from './use-logout';

const useCheckAuth = (): CheckAuth => {
    const authProvider = useAuthProvider();

    const logout = useLogout();

    const checkAuth = useCallback(
        (
            params: any = {},
            logoutOnFailure = true,
            redirectTo = 'Login',
            disableNotification = false
        ) =>
            authProvider.checkAuth(params).catch((error) => {
                if (logoutOnFailure) {
                    logout(
                        {},
                        error && error.redirectTo
                            ? error.redirectTo
                            : redirectTo
                    );
                    const shouldSkipNotify =
                        disableNotification ||
                        (error && error.message === false);
                    !shouldSkipNotify;
                }
                throw error;
            }),
        [authProvider, logout /* notify */]
    );

    return authProvider ? checkAuth : checkAuthWithoutAuthProvider;
};

const checkAuthWithoutAuthProvider = () => Promise.resolve();

type CheckAuth = (
    params?: any,
    logoutOnFailure?: boolean,
    redirectTo?: string,
    /** @deprecated to disable the notification, authProvider.checkAuth() should return an object with an error property set to true */
    disableNotification?: boolean
) => Promise<any>;

const getErrorMessage = (error: any, defaultMessage: string) =>
    typeof error === 'string'
        ? error
        : typeof error === 'undefined' || !error.message
        ? defaultMessage
        : error.message;

export default useCheckAuth;
