import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import NotificationController from '@main-components/NotificationController';
import APIAuthProvider from '@modules/auth/infrastructure/providers/api-auth-provider';
import NewUpdate from '@modules/auth/ui/screens/NewUpdate';
import LocationUtils from '@modules/_shared/domain/utils/misc/location-utils';
import SharingUtils from '@modules/_shared/domain/utils/misc/sharing-utils';
import useStartFirebase from '@modules/_shared/infrastructure/firebase/use-start-firebase';
import useHandleUpdates from '@modules/_shared/infrastructure/ota-updates/use-handle-updates';
import AppProvider from '@modules/_shared/infrastructure/providers/app-provider';
import CitybestDataProvider from '@modules/_shared/infrastructure/providers/citybest-data-provider';
import CitybestServiceProvider from '@modules/_shared/infrastructure/providers/citybest-service-provider';
import Navigation from '@navigation/index';
import theme from '@shared/domain/utils/constants/AppTheme';
import ArrayUtils from '@shared/domain/utils/misc/array-utils';
import ClipboardUtils from '@shared/domain/utils/misc/clipboard-utils';
import DateTimeUtils from '@shared/domain/utils/misc/datetime-utils';
import LinkingUtils from '@shared/domain/utils/misc/linking-utils';
import NetworkUtils from '@shared/domain/utils/misc/network-utils';
import ObjectUtils from '@shared/domain/utils/misc/object-utils';
import * as Notifications from 'expo-notifications';
import ConfirmController from './src/main-components/ConfirmController';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import DefaultDataProvider from 'config/providers/DefaultDataProvider';
import LocationProvider from 'config/Location/providers/LocationProvider';
import { store } from './store'

// let customFonts = {
//     'ptsans': require('@assets/fonts/PTSans-Regular.ttf'),
// };

if (__DEV__) {
    require('./ReactotronConfig');
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
});

/* 
    ! ! ! ! ATENCION ! ! ! !
    No elimine este comentario, incremente el contador  y deje su nombre al final

    Tenga cuidado con este cliente, no le gusta pagar al dia 
    y siempre tiene una excusa nueva para no pagar

    Numero de victimas (1)
    Leonardo Tapia / barinas.code@gmail.com

*/

export default function App() {
    const { newUpdateAvailable, reload } = useHandleUpdates();
    useStartFirebase();

    const [loading, setloading] = useState(true)
    
    // useEffect(() => {
    //     async function _loadFontsAsync() {
    //         await Font.loadAsync(customFonts);
    //         setloading(false)
    //     }
    //     _loadFontsAsync();
    // }, []);



    return (
        <Provider store={store}>
            <LocationProvider>

                <DefaultDataProvider>
                    <AppProvider
                        utils={{
                            object: ObjectUtils,
                            date: DateTimeUtils,
                            linking: LinkingUtils,
                            array: ArrayUtils,
                            network: NetworkUtils,
                            clipboard: ClipboardUtils,
                            location: LocationUtils,
                            sharing: SharingUtils
                        }}
                        theme={theme}
                        dataProvider={CitybestDataProvider}
                        serviceProvider={CitybestServiceProvider}
                        authProvider={APIAuthProvider}
                    >
                        {newUpdateAvailable ? (
                            <NewUpdate
                                title="Nueva actualización"
                                onReloadPress={async () => {
                                    await reload();
                                }}
                            />
                        ) : (
                            <>
                                <Navigation />
                                <NotificationController />
                                <ConfirmController />
                            </>
                        )}
                    </AppProvider>
                </DefaultDataProvider>
            </LocationProvider>
        </Provider>
    );
}


