import useAuthProvider from '@modules/auth/application/hooks/use-auth-provider';
import { useEffect, useState } from 'react';

export default function useIsLoggedIn() {
    const [loading, setLoading] = useState(true);
    const [hasToken, setHasToken] = useState(false);
    const checkAuth = useAuthProvider((s) => s.checkAuth);
    const state = useAuthProvider((s) => s.state);

    useEffect(() => {
        (async () => {
            try {
                const token = await checkAuth({});
                setLoading(false);
                setHasToken(!!token);
            } catch (error) {
                setLoading(false);
                setHasToken(false);
            }
        })();
    }, [state]);

    return { loading, isLoggedIn: hasToken };
}
