import useFirestore from '@modules/_shared/infrastructure/firebase/use-firestore';
import { useEffect } from 'react';
import useGetIdentity from './use-get-identity';

export default function useSaveSession(token: string) {
    const db = useFirestore();
    const { identity: user } = useGetIdentity();

    const start = () => {
        if (!token) return;

        db.doc(`userSessions/${user?.id}`)
            .set({
                userId: user?.id,
                id: token
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        if (!user) {
            return;
        }

        start();
    }, [user, token]);
}
