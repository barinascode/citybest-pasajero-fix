import { useState } from 'react';
import useAuthProvider from './use-auth-provider';

export default function useUpdateIdentity() {
    const updateIdentity = useAuthProvider((s) => s.updateIdentity);
    const dispatch = useAuthProvider((s) => s.dispatch);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(true);

    return {
        uploadImageProfile: (status: boolean) => {
            setLoading(true);
        },
        update: async (user: any) => {
            setLoaded(false);
            setLoading(true);
            try {
                updateIdentity && (await updateIdentity(user));
                // console.log("identity updated",user);
                dispatch({ type: 'UPDATE_IDENTITY', userData: user });
                setLoaded(true);
                setLoading(false);
            } catch (error) {
                setLoaded(true);
                setLoading(false);
            }
        },
        loading,
        loaded
    };
}
