import { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID } from '@env';
import AuthProviderContext from '@modules/auth/domain/contexts/auth-provider-context';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';
import { AuthProvider } from '@modules/_shared/types';
// import * as GoogleSignIn from 'expo-google-sign-in';
import { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import useAuthProvider from './use-auth-provider';
import useHandleSocialLoginResponse from './use-handle-social-login-response';
// import * as Google from 'expo-google-app-auth';

export async function useGoogleInitAsync() {

    console.log("ANDROID_GOOGLE_CLIENT_ID", ANDROID_GOOGLE_CLIENT_ID);
    return true

    // try {
    //     await GoogleSignIn.initAsync({
    //         clientId:
    //             Platform.OS == 'android'
    //                 ? ANDROID_GOOGLE_CLIENT_ID
    //                 : IOS_GOOGLE_CLIENT_ID,
    //         language: 'es'
    //     });
    // } catch (error) {
    //     alert(error);
    // }

}

export  async  function useGoogleDev() {
    // const { type, accessToken, user } = await Google.logInAsync(config);
    // if (type === 'success') {
     
    //   let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   });
    // }
}


export const useGoogleLogoutAsync = async () => {
    // try {
    //     let isLoggedIn = await GoogleSignIn.isSignedInAsync();
    //     if (isLoggedIn) {
    //         await GoogleSignIn.signOutAsync();
    //     }
    // } catch (error) {}
};

export default function useGoogleLogin() {
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<{
        type: string;
        accessToken?: string;
        error?: string;
    } | null>(null);

    const action = async () => {
        setLoading(true);
        try {
            // await GoogleSignIn.askForPlayServicesAsync();
            // const { type, user } = await GoogleSignIn.signInAsync();

            // setResponse({
            //     type: type,
            //     accessToken: user?.auth?.accessToken
            // });
        } catch ({ message }) {
            /*    alert(message); */
            setResponse({
                type: 'error',
                // error: message
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
                .loginWithGoogle(accessToken)
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
        socialName: 'google',
        setLoading
    });

    return {
        login: action,
        loading: loading
    };
}
