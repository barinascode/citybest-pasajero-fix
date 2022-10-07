import { FACEBOOK_APP_ID } from '@env';
import AuthProviderContext from '@modules/auth/domain/contexts/auth-provider-context';
import AuthProvider from '@modules/auth/domain/services/auth-provider';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
// import * as Facebook from 'expo-facebook';
import { useCallback, useState } from 'react';
import useAuthProvider from './use-auth-provider';
import useHandleSocialLoginResponse from './use-handle-social-login-response';

export async function useFacebookInitAsync() {
    try {
        // await Facebook.initializeAsync({
        //     appId: FACEBOOK_APP_ID
        // });
    } catch (error) {
        alert(error);
    }
}

export const useFacebookLogoutAsync = async () => {
    try {
        // await Facebook.logOutAsync();
    } catch (error) {}
};

export default function useFacebookLogin() {
    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState<{
        type: string;
        accessToken?: string;
        error?: string;
    } | null>(null);

    const action = async () => {
        setLoading(true);

        // try {
        //     const { type, token }: any =
        //         await Facebook.logInWithReadPermissionsAsync();

        //     setResponse({
        //         type: type,
        //         accessToken: token
        //     });
        // } catch ({ message }) {
        //     setResponse({
        //         type: 'error',
        //         error: message
        //     });
        // }
    };

    const dispatch = useContextSelector<AuthProvider, AuthProvider['dispatch']>(
        AuthProviderContext,
        (v) => v.dispatch
    );
    const notify = useNotify();

    const authProvider = useAuthProvider();

    const serverAuthenticationAction = useCallback(
        (accessToken) => {
            return authProvider
                .loginWithFacebook(accessToken)
                .then(({ token, user }: any) => {
                    dispatch({ type: 'SIGN_IN', token: token, userData: user });
                })
                .catch((e) => {
                    notify('No fue posible iniciar sesión.', 'error');
                })
                .finally(() => {
                    setLoading(false);
                });
        },
        [authProvider]
    );

    useHandleSocialLoginResponse({
        responseState: response,
        serverAuthenticationAction,
        socialName: 'facebook',
        setLoading
    });

    return {
        login: action,
        loading
    };
}
