import firebase from 'firebase';

export default function useFirebaseRealTimeDatabase() {
    return firebase.database();
}
