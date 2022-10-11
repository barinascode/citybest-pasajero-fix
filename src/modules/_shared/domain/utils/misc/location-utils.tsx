import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as Location from 'expo-location';
import GeoPoint from '../../models/geo-point';
import LocationAddress from '../../models/location-address';

const LocationUtils = {
    async requestForegroundPermissionsAsync() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('NOT_GRANTED');
        }
        return { status };
    },



    async getCurrentPosition(): Promise<GeoPoint> {

        const MAX_ATTEMPTS = 50;

        let { status } =
            await LocationUtils.requestForegroundPermissionsAsync();

        const lastTry: number = parseInt(
            (await AsyncStorage.getItem('GPS_LOC_TRY')) || '0'
        );

        let location = { coords: { latitude: 0, longitude: 0 } };
        try {
            /*  if (status == 'granted' && lastTry < 2) {
                throw new Error('NOT_GRANTED');
            } */

            if (status !== 'granted') {
                throw new Error('NOT_GRANTED');
            }

            location = await Location.getCurrentPositionAsync({
                accuracy: Location.LocationAccuracy.Highest
            });
        } catch (error: any) {
            if (lastTry < MAX_ATTEMPTS) {
                /*   alert('Try: ' + lastTry); */
                await AsyncStorage.setItem(
                    'GPS_LOC_TRY',
                    (lastTry + 1).toString()
                );
                return LocationUtils.getCurrentPosition();
            }

            await AsyncStorage.removeItem('GPS_LOC_TRY');
            throw new Error(error);
        }

        await AsyncStorage.removeItem('GPS_LOC_TRY');

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        };
    },
    async geocode(address: string): Promise<GeoPoint> {
        let { status } =
            await LocationUtils.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('NOT_GRANTED');
        }

        try {
            let location = await Location.geocodeAsync(address);

            if (location.length == 0) {
                //  throw new Error('Location not found');
                return {
                    latitude: -1,
                    longitude: -1
                };
            }

            return {
                latitude: location[0].latitude,
                longitude: location[0].longitude
            };
        } catch (error) {
            return {
                latitude: -1,
                longitude: -1
            };
        }
    },

    async getPositionAddress(position: GeoPoint) {
        let { status } =
            await LocationUtils.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            throw new Error('NOT_GRANTED');
        }
        
        axios.post('http://192.168.1.12:3008',{
            body: JSON.stringify({
                'hook': 'getPositionAddress',
                message : '= = = SOLICITANDO : Location.reverseGeocodeAsync = = =',
            })
        });

        let data = await Location.reverseGeocodeAsync(position);

        axios.post('http://192.168.1.12:3008',{
            body: JSON.stringify({
                'hook': 'getPositionAddress',
                data: data,
                position: position
            })
        });

        if (data.length == 0) {
            throw new Error('NOT_FOUND');
        }

        return LocationAddress.fromPrimitives({
            ...data[0]
        });
    }
};

export default LocationUtils;
