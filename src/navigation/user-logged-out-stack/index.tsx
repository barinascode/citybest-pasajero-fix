import CompleteRegistration from '@modules/auth/ui/screens/CompleteRegistration';
import ForgotPassword from '@modules/auth/ui/screens/ForgotPassword';
import Login from '@modules/auth/ui/screens/Login';
import Register from '@modules/auth/ui/screens/Register';
import RegisterSuccess from '@modules/auth/ui/screens/RegisterSuccess';
import Welcome from '@modules/auth/ui/screens/Welcome';
import useStackHeaderStyles from '@navigation/user-logged-in-stack/hooks/use-stack-header-styles';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';

const Stack = createStackNavigator();

export default function UserLoggedOutStack() {
    const styles = useStackHeaderStyles();

    return (
        <Stack.Navigator screenOptions={styles} initialRouteName={'Login'}>
            <Stack.Screen
                name="Welcome"
                options={{
                    headerShown: false
                }}
                component={Welcome}
            />
            <Stack.Screen
                name="Login"
                options={{
                    headerShown: false,
                    headerTitleStyle: styles.headerTitleStyle
                }}
                component={Login}
            />
            <Stack.Screen
                name="RegisterSuccess"
                options={{
                    headerShown: false,
                    headerTitleStyle: styles.headerTitleStyle
                }}
                component={RegisterSuccess}
            />
            <Stack.Screen
                name="Register"
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: 'Completa tus datos',
                    headerShown: false
                }}
                initialParams={{
                    title: 'Completa tus datos'
                }}
                component={Register}
            />

            <Stack.Screen
                name="CompleteRegistration"
                options={{
                    headerTitleStyle: styles.headerTitleStyle,
                    headerTitle: 'Completa tus datos',
                    headerShown: false
                }}
                component={CompleteRegistration}
            />
            <Stack.Screen
                name="ForgotPassword"
                options={{
                    headerShown: Platform.OS !== 'web',
                    headerTitleStyle: styles.headerTitleStyle
                }}
                component={ForgotPassword}
            />
        </Stack.Navigator>
    );
}
