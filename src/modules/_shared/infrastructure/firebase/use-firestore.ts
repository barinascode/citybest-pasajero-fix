import firebase from 'firebase';

export default function useFirestore() {
    return firebase.firestore();
}
