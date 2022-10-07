// import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';
import { useEffect } from 'react';

export default function useTrackingTransparency() {
    useEffect(() => {
        
        // (async () => {
        //     const { status } = await requestTrackingPermissionsAsync();
        //     if (status === 'granted') {
        //         console.log('Yay! I have user permission to track data');
        //     }
        // })();

    }, []);
}
