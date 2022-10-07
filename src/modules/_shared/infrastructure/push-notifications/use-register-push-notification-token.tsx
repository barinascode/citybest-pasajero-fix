import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

export default function useRegisterPushNotificationToken() {
    const [currentToken, setToken] = useState<any>();

    useEffect(() => {
        (async () => {
            try {
                const token = await registerForPushNotificationsAsync();

                setToken(token);
            } catch (error) {
                if (error?.message == 'PUSH_TOKEN_NOT_REGISTERED') {
                }
            }
        })();
    }, []);

    return {
        token: currentToken
    };
}

const registerForPushNotificationsAsync = async () => {
    if (Platform.OS === 'web') {
        return;
    }

    let token = undefined;

    if (Constants.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            throw new Error('PUSH_TOKEN_NOT_REGISTERED');
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
    } else {
        // alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('citybest-app', {
            name: 'citybest-app',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250]
            //sound: 'alert.wav'
        });
    }

    return token;
};
