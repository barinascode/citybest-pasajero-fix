import { useSafeSetState } from '@shared/domain/hooks/utils-hooks';
import { useEffect } from 'react';
import UserIdentity from '../../domain/models/user-identity';
import useAuthProvider from './use-auth-provider';

const useGetIdentity = () => {
    const [state, setState] = useSafeSetState<State>({
        loading: true,
        loaded: false
    });
    const getIdentity = useAuthProvider((s) => s.getIdentity);

    useEffect(() => {
        if (getIdentity) {
            const callAuthProvider = async () => {
                try {
                    const identity = getIdentity && (await getIdentity());

                    setState({
                        loading: false,
                        loaded: true,
                        identity: identity
                    });
                } catch (error) {
                    setState({
                        loading: false,
                        loaded: true,
                        error
                    });
                }
            };
            callAuthProvider();
        } else {
            setState({
                loading: false,
                loaded: true,
                identity: undefined
            });
        }
    }, [getIdentity, setState]);
    return state;
};

interface State {
    loading: boolean;
    loaded: boolean;
    identity?: UserIdentity;
    error?: any;
}

export default useGetIdentity;
