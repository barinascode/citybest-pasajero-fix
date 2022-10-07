import useFirestore from '@modules/_shared/infrastructure/firebase/use-firestore';
import { useEffect, useState } from 'react';
import useGetIdentity from './use-get-identity';
import useLogout from './use-logout';

export default function useSessionHandler(token: string) {
    const [loading, setLoading] = useState<boolean>(true);
    const db = useFirestore();
    const { identity: user } = useGetIdentity();
    let unsubscribe: any = undefined;
    const logout = useLogout();

    const start = () => {
        setLoading(true);

        unsubscribe = db.doc(`userSessions/${user?.id}`).onSnapshot((res) => {
            if (!res.exists) {
                return;
            }

            const data = res.data();

            if (data?.id !== token) {
                logout({
                    notificationText: 'Otro usuario ha entrado con esta cuenta.'
                });
            }
        });
    };

    useEffect(() => {
        if (!token) return;
        if (!user) {
            return;
        }

        start();

        return () => {
            unsubscribe && unsubscribe();
        };
    }, [user, token]);
}
