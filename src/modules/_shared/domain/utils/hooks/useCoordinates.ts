import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export default function useCoordinates(address: string) {
    const [loading, setLoading] = useState(true);
    // const [location, setLocation] = useState({
    //     latitude: 0,
    //     longitude: 0,
    //     latitudeDelta: 0,
    //     longitudeDelta: 0
    // });
    const [location, setLocation] = useState({});
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

    // useEffect(() => {
    //     async () => {
    //         if (!location) {
    //             const { status } = await Permissions.askAsync(
    //                 Permissions.LOCATION_FOREGROUND
    //             );

    //             if (status !== 'granted') {
    //                 throw new Error('Permmission denied');
    //             }

    //             let foundLocation = address
    //                 ? await Location.geocodeAsync(address)
    //                 : null;
    //             setLoading(false);
    //             const firstLocation = foundLocation
    //                 ? foundLocation.pop()
    //                 : null;

    //             if (firstLocation) {
    //                 setLocation({
    //                     latitude: firstLocation.latitude,
    //                     longitude: firstLocation.longitude,
    //                     latitudeDelta: 0.0922,
    //                     longitudeDelta: 0.0421
    //                 });
    //             }
    //         }
    //     };
    // }, [location]);

    return {
        location,
        loading: loading
    };
}
