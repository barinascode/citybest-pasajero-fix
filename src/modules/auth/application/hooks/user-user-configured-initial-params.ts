import { useEffect, useState } from 'react';
import useAuthProvider from './use-auth-provider';

export default function userUserConfiguredInitialParams() {
    const state = useAuthProvider((s) => s.state);
    const [configuredParams, setConfiguredParams] = useState(false);

    useEffect(() => {
        setConfiguredParams(!!state?.userData?.phone);
    }, [state?.userData?.phone]);

    return configuredParams;
}
