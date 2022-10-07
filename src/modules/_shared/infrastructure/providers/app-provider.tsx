import useAuthProvider from '@modules/auth/application/hooks/use-auth-provider';
import AuthProviderContext from '@modules/auth/domain/contexts/auth-provider-context';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import DataProviderContext from '@shared/domain/contexts/data-provider-context';
import NotificationProviderContext from '@shared/domain/contexts/notification-provider-context';
import ServiceProviderContext from '@shared/domain/contexts/service-provider-context';
import UtilsProviderContext from '@shared/domain/contexts/utils-provider-context';
import { AppUtils } from '@shared/domain/models/app-utils';
import axios from 'axios';
import React, { ReactChild, ReactChildren } from 'react';
import { Provider as MainComponentsProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from 'react-query';
import getApiUrl from '../utils/get-api-url';
import { ThemeProvider } from '@shopify/restyle';
// import { AppearanceProvider } from 'react-native-appearance';
const queryClient = new QueryClient();

interface AppProviderProps {
    children: ReactChild | ReactChildren;
    customRoutes?: any;
    dataProvider: (userTokenId?: string) => object;
    serviceProvider: any;
    authProvider: any;
    theme?: object;
    utils: AppUtils;
}

export default function AppProvider({
    children,
    theme,
    utils,
    dataProvider,
    serviceProvider,
    authProvider
}: AppProviderProps) {
    return (
        // <AppearanceProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={theme}>
                    <NotificationProvider>
                        <UtilsProviderContext.Provider
                            value={{
                                utils: utils
                            }}
                        >
                            <AuthProvider value={authProvider}>
                                <ServiceProviderContext.Provider
                                    value={serviceProvider}
                                >
                                    <DataProvider value={dataProvider}>
                                        <MainComponentsProvider>
                                            {children}
                                        </MainComponentsProvider>
                                    </DataProvider>
                                </ServiceProviderContext.Provider>
                            </AuthProvider>
                        </UtilsProviderContext.Provider>
                    </NotificationProvider>
                </ThemeProvider>
            </QueryClientProvider>
            // </AppearanceProvider>
       
    );
}

function NotificationProvider({ children }: any) {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'SHOW_NOTIFICATION':
                    return {
                        ...prevState,
                        text: action.text,
                        show: true,
                        notificationType: action.notificationType,
                        messageArgs: action.messageArgs,
                        undoable: action.undoable,
                        autoHideDuration: action.autoHideDuration,
                        action: action.action
                    };
                case 'HIDE_NOTIFICATION':
                    return {
                        ...prevState,
                        text: '',
                        show: false,
                        action: null
                    };

                case 'SHOW_CONFIRM':
                    return {
                        ...prevState,
                        confirm: {
                            ...prevState.confirm,
                            show: true,
                            title: action.title,
                            content: action.content,
                            onConfirm: action.onConfirm,
                            onCancel: action.onCancel,
                            options: action.options
                        }
                    };

                case 'HIDE_CONFIRM':
                    return {
                        ...prevState,
                        confirm: {
                            ...prevState.confirm,
                            show: false,
                            title: null,
                            content: null
                        }
                    };
            }
        },
        {}
    );

    return (
        <NotificationProviderContext.Provider
            value={{
                text: state.text,
                show: state.show,
                notificationType: state.notificationType,
                messageArgs: state.messageArgs,
                undoable: state.undoable,
                autoHideDuration: state.autoHideDuration,
                confirm: state.confirm,
                dispatch,
                action: state.action,
                state
            }}
        >
            {children}
        </NotificationProviderContext.Provider>
    );
}

function AuthProvider({ children, value }: any) {


    const [state, dispatch] = React.useReducer(
        (prevState: any, action: any) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        isLoggedIn: !!action.token,
                        userToken: action.token,
                        userData: action.userData
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        userData: action.userData,
                        isLoggedIn: true
                    };
                case 'SIGN_OUT':    
                
                // Leonardo Tapia
                // const { data: user } = useGetProfile();
                // const serviceUri = getApiUrl(`admin/sessions/${user?.id}`)
                // axios.delete(serviceUri)

                    return {
                        ...prevState,
                        userData: null,
                        userToken: null,
                        isLoggedIn: false
                    };

                case 'UPDATE_IDENTITY':
                    return {
                        ...prevState,
                        userData: {
                            ...(prevState.userData || {}),
                            ...action.userData
                        }
                    };
            }
        },
        {
            isLoggedIn: false,
            userToken: null
        }
    );

    return (
        <AuthProviderContext.Provider value={{ ...value, dispatch, state }}>
            {children}
        </AuthProviderContext.Provider>
    );
}

function DataProvider({ children, value }) {
    const token = useAuthProvider((s) => s?.state?.userToken);

    return (
        <DataProviderContext.Provider value={value(token)}>
            {children}
        </DataProviderContext.Provider>
    );
}
