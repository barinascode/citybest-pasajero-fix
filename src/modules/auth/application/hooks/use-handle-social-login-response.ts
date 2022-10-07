import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { useEffect } from 'react';

export default function useHandleSocialLoginResponse({
    responseState,
    serverAuthenticationAction,
    socialName,
    setLoading
}: {
    responseState: {
        type: string;
        accessToken?: string;
        error?: string;
    } | null;
    serverAuthenticationAction: any;
    socialName: 'google' | 'facebook' | 'apple';
    setLoading: any;
}) {
    const notify = useNotify();

    const capitalizedSocialName =
        socialName.charAt(0).toUpperCase() + socialName.slice(1);

    useEffect(() => {
        if (responseState?.type === 'success') {
            const { accessToken } = responseState;

            if (!accessToken) {
                notify(
                    `Ha ocurrido un error al iniciar sesión con ${capitalizedSocialName}`,
                    'error'
                );
                setLoading(false);

                return;
            }
            serverAuthenticationAction(accessToken);
        }

        if (responseState?.type === 'error') {
            notify(
                `Ha ocurrido un error al iniciar sesión con ${capitalizedSocialName}`,
                'error'
            );
            setLoading(false);
        }

        if (responseState?.type === 'cancel') {
            notify(
                `Inicio de sesión con con ${capitalizedSocialName} cancelado`,
                'info'
            );
            setLoading(false);
        }

        //console.log("responseState", responseState);
    }, [responseState]);
}
