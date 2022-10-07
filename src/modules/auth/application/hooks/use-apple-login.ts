import AuthProviderContext from '@modules/auth/domain/contexts/auth-provider-context';
import AuthProvider from '@modules/auth/domain/services/auth-provider';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useCallback, useState } from 'react';
import useAuthProvider from './use-auth-provider';
import useHandleSocialLoginResponse from './use-handle-social-login-response';

export async function useAppleInitAsync() {
    try {
        /*  await Facebook.initializeAsync({
            appId: FACEBOOK_APP_ID
        }); */
    } catch (error) {
        alert(error);
    }
}

export const useAppleLogoutAsync = async () => {
    try {
        /*   await Facebook.logOutAsync(); */
    } catch (error) {}
};

export default function useAppleLogin() {
    const [loading, setLoading] = useState(false);

    const [response, setResponse] = useState<{
        type: string;
        accessToken?: string;
        error?: string;
    } | null>(null);

    const action = async () => {
        setLoading(true);

        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            });

            setResponse({
                type: 'success',
                accessToken: credential.identityToken ?? undefined
            });
        } catch (e: any) {
            setResponse({
                type: e.code === 'ERR_CANCELED' ? 'cancel' : 'error',
                error:
                    e.code === 'ERR_CANCELED'
                        ? 'Inicio cancelado'
                        : (e.message as any)
            });
        }
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
                .loginWithApple(accessToken)
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
        socialName: 'apple',
        setLoading
    });

    return {
        login: action,
        loading
    };
}
