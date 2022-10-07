import userUserConfiguredInitialParams from '@modules/auth/application/hooks/user-user-configured-initial-params';
import Splash from '@modules/auth/ui/screens/Splash';
import useSavePushToken from '@modules/user/application/hooks/use-save-push-token';
import NetworkError from '@modules/user/ui/screens/NetworkError';
import images from '@modules/_shared/domain/utils/constants/images';
import useRegisterPushNotificationToken from '@modules/_shared/infrastructure/push-notifications/use-register-push-notification-token';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import useIsLoggedIn from '../modules/auth/application/hooks/use-is-logged-in';
import useRestoreSession from '../modules/auth/application/hooks/use-restore-session';
import useScreenNotificationController from '../modules/_shared/domain/hooks/use-screen-notification-controller';
import UserLoggedInDrawer, {
    UserLoggedInInitialWorkflow
} from './user-logged-in-stack';
import UserLoggedOutStack from './user-logged-out-stack';

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync().catch(() => { });

export default function Navigation() {
    const { loaded } = useAppReady();

    const { loading: loadingSession } = useRestoreSession();
    const { loading: checkingUserAuthenticated, isLoggedIn } = useIsLoggedIn();
    const userInitialParamsConfigured = userUserConfiguredInitialParams();
    const isReady = loaded && !checkingUserAuthenticated && !loadingSession;
    const screenNotification = useScreenNotificationController();

    const { token } = useRegisterPushNotificationToken();
    const { save: saveToken } = useSavePushToken();

    // useSaveSession(token);
    // useSessionHandler(token);

    useEffect(() => {
        if (token && isLoggedIn) {
            saveToken({ token: token });
        }
    }, [token, isLoggedIn]);

    return (
        <Root
            isReady={isReady}
            userLoggedIn={isLoggedIn}
            userInitialParamsConfigured={userInitialParamsConfigured}
            screenNotification={screenNotification}
        />
    );
}


function Root({
    screenNotification,
    isReady,
    userLoggedIn,
    userInitialParamsConfigured
}: any) {
    return (
        <NavigationContainer>
            {screenNotification.screen === 'NetworkError' ? (
                <Stack.Navigator>
                    <Stack.Screen
                        name="NetworkError"
                        options={{ headerShown: false }}
                        component={NetworkError}
                    />
                </Stack.Navigator>
            ) : !isReady ? (
                <Stack.Navigator screenOptions={{ headerStatusBarHeight: 0 }}>
                    <Stack.Screen
                        name="SplashScreen"
                        options={{ headerShown: false }}
                        component={Splash}
                    />
                </Stack.Navigator>
            ) : userLoggedIn ? (
                userInitialParamsConfigured ? (
                    <UserLoggedInDrawer />
                ) : (
                    <UserLoggedInInitialWorkflow />
                )
            ) : (
                <UserLoggedOutStack />
            )}
        </NavigationContainer>
    );
}

function useAppReady() {
    let [fontsLoaded] = useFonts({
        IcoCitybest: require('@assets/fonts/icocitybest.ttf'),
        CitybestFont: require('@assets/fonts/overpass_font.ttf')
    });
    const [appLoaded, setAppLoaded] = useState(false);

    function cacheImages(images: any) {
        return images.map((image: any) => {
            if (typeof image === 'string') {
                return Image.prefetch(image);
            } else {
                return Asset.fromModule(image).downloadAsync();
            }
        });
    }

    async function _loadAssetsAsync() {
        const imageAssets = cacheImages([
            images.BG_INIT_VIDEO,
            images.THANKS_IMAGE_VIDEO
        ]);

        await Promise.all([...imageAssets]);
    }

    useEffect(() => {
        (async () => {
            await _loadAssetsAsync();

            if (fontsLoaded) {
                try {
                    await SplashScreen.hideAsync();
                } catch (e) {
                    // handle errors
                } finally {
                    setAppLoaded(true);
                }
            }
        })();
    }, [fontsLoaded]);

    return {
        loaded: appLoaded
    };
}
