import {
    FB_API_KEY,
    FB_APP_ID,
    FB_AUTH_DOMAIN,
    FB_DB_URL,
    FB_MEASUREMENT_ID,
    FB_MESSAGING_SENDER_ID,
    FB_PROJECT_ID,
    FB_STORAGE_BUCKET
} from '@env';
import firebase from 'firebase/app';

export default function useStartFirebase() {
    const firebaseConfig = {
        apiKey: FB_API_KEY,
        authDomain: FB_AUTH_DOMAIN,
        databaseURL: FB_DB_URL,
        projectId: FB_PROJECT_ID,
        storageBucket: FB_STORAGE_BUCKET,
        messagingSenderId: FB_MESSAGING_SENDER_ID,
        appId: FB_APP_ID,
        measurementId: FB_MEASUREMENT_ID
    };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
