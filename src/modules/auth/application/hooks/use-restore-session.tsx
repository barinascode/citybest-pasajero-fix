import useAuthProvider from '@modules/auth/application/hooks/use-auth-provider';
import { useEffect, useState } from 'react';

export default function useRestoreSession() {
    const dispatch = useAuthProvider((s) => s.dispatch);
    const checkAuth = useAuthProvider((s) => s.checkAuth);
    const getIdentity = useAuthProvider((s) => s.getIdentity);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);

                const token = await checkAuth({});
                const userData = getIdentity ? await getIdentity() : undefined;

                dispatch({
                    type: 'RESTORE_TOKEN',
                    token: token,
                    ...(getIdentity && {
                        userData: userData?.toPrimitives()
                    })
                });

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })();
    }, [getIdentity]);

    return {
        loading
    };
}
