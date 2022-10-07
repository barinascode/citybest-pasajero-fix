import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Text from '@main-components/Text';
import CompleteRegistration from '@modules/auth/ui/screens/CompleteRegistration';
import AddCard from '@modules/user/ui/screens/AddCard';
import Dashboard from '@modules/user/ui/screens/Dashboard';
import Help from '@modules/user/ui/screens/Help';
import MyFavoritePlaces from '@modules/user/ui/screens/MyFavoritePlaces';
import MyTrips from '@modules/user/ui/screens/MyTrips';
import PaymentMethods from '@modules/user/ui/screens/PaymentMethods';
import Profile from '@modules/user/ui/screens/Profile';
import theme, {
    useTheme
} from '@modules/_shared/domain/utils/constants/AppTheme';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import AppDrawerContent from './components/AppDrawerContent';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
let customFonts = {
    'ptsans': require('@assets/fonts/PTSans-Regular.ttf'),
};


const Drawer = createDrawerNavigator();

const screens = [
    <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ drawerLabel: 'Inicio' }}
        key='a1'
    />,

    <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
            drawerLabel: 'Editar perfil',
            drawerIcon: (props) => (
                <AppIcon
                    name="user"
                    {...props}
                    style={[]}
                    color={theme.colors.primaryMain}
                />
            )
        }}
        key='a2'
    />,

    <Drawer.Screen
        name="Trips"
        component={MyTrips}
        options={{
            drawerLabel: 'Mis viajes',
            drawerIcon: (props) => (
                <AppIcon
                    name="nav"
                    {...props}
                    color={theme.colors.primaryMain}
                />
            )
        }}
        key='a3'
    />,

    <Drawer.Screen
        name="Favorites"
        component={MyFavoritePlaces}
        options={{
            drawerLabel: 'Favoritos',
            drawerIcon: (props) => (
                <AppIcon
                    name="favorite"
                    {...props}
                    color={theme.colors.primaryMain}
                />
            )
        }}
        key='a4'
    />,

    <Drawer.Screen name="PaymentMethods" component={PaymentMethods} key='a5'/>,

    <Drawer.Screen name="AddCard" component={AddCard} key='a6'/>,

    <Drawer.Screen name="Help" component={Help} key='a7'/>
];

export default function UserLoggedInDrawer() {
    const theme = useTheme();

    const [fontsLoaded] = useFonts({
        'ptsans': require('@assets/fonts/PTSans-Regular.ttf')
      });

      if (!fontsLoaded) {
        return null;
      }

    // useEffect(() => {
    //     async function _loadFontsAsync() {
    //         await Font.loadAsync(customFonts);
    //     }
    //     _loadFontsAsync();
    // }, []);

    return (
        <Drawer.Navigator
            initialRouteName="Dashboard"
            drawerContent={(props) => <AppDrawerContent {...props} />}
            drawerContentOptions={{
                labelStyle: {
                   //fontFamily: theme.textVariants.body.fontFamily,
                    color: '#000',
                    fontWeight:'100',
                    fontFamily: 'ptsans',
                    fontSize: theme.textVariants.drawerItemsLabel.fontSize,
                },
                activeTintColor: theme.colors.white,
                inactiveTintColor: theme.colors.black
            }}
        >
            {screens}
        </Drawer.Navigator>
    );
}

const initialScreenWorkflow = [
    ...screens,
    <Drawer.Screen
        name="CompleteRegistration"
        component={CompleteRegistration}
        options={{ drawerLabel: '' }}
    />
];
export function UserLoggedInInitialWorkflow() {
    const theme = useTheme();

    return (
        <Drawer.Navigator
            initialRouteName="CompleteRegistration"
            drawerContent={(props) => <AppDrawerContent {...props} />}
            drawerContentOptions={{
                labelStyle: {
                    fontFamily: theme.textVariants.body.fontFamily,
                    color: theme.colors.black,
                    fontSize: theme.textVariants.drawerItemsLabel.fontSize
                },
                activeTintColor: theme.colors.white,
                inactiveTintColor: theme.colors.black
            }}
        >
            {initialScreenWorkflow}
        </Drawer.Navigator>
    );
}

function InDevelopment() {
    return (
        <Box>
            <Text variant="heading1">In development</Text>
        </Box>
    );
}
