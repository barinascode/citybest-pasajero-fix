import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import { statusBarHeight } from '@main-components/StatusBar';
import Text from '@main-components/Text';
import useLogout from '@modules/auth/application/hooks/use-logout';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import User from '@modules/user/domain/models/user';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import {
    DrawerContentComponentProps,
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import { getProfileState } from 'integration/modules/Profile/store/profile.slice';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

export default function AppDrawerContent(props: DrawerContentComponentProps) {
    const logout = useLogout();
    const theme = useTheme();
    const { sharing, linking } = useUtils();


    return (
        <>
            <DrawerContentScrollView {...props}
            >
                <DrawerHeader />
                
                {Object.keys(props.descriptors)
                    .filter((d) => {
                        return (
                            d.indexOf('Dashboard') == -1 &&
                            d.indexOf('CompleteRegistration') == -1 &&
                            d.indexOf('Card') == -1 &&
                            d.indexOf('PaymentMethods') == -1 &&
                            d.indexOf('Help') == -1
                        );
                    })
                    .map((key) => {
                        const d = props.descriptors[key];
                        const label = d.options.drawerLabel;
                        const icon = d.options.drawerIcon;

                        return (
                            <DrawerItem
                                key={key}
                                icon={icon}
                                label={label as any}
                                {...props}
                                onPress={() => {
                                    props.navigation.navigate(
                                        key.split('-')[0]
                                    );
                                }}
                            />
                        );
                    })}

                {/* <MenuSectionTitle title="Social" /> */}
                {/* <Division /> */}
                <DrawerItem
                    icon={(props) => (
                        <AppIcon
                            color={theme.colors.primaryMain}
                            size={props.size}
                            name="share"
                        />
                    )}
                    {...props}
                    label="Compartir app"
                    onPress={() => {
                        sharing.share({
                            title: 'Invita a tus amigos',
                            message:
                                'Hola!, Descarga Citybest, la mejor app de viajes ecológicos!',
                            url: 'https://citybestapp.com'
                        });
                    }}
                />

                {/* <MenuSectionTitle title="Información" /> */}
                {/* <Division /> */}
                <DrawerItem
                    icon={(props) => (
                        <Image
                            source={images.HELP}
                            style={{
                                width: props.size,
                                height: props.size,
                                resizeMode: 'contain'
                            }}
                        />
                    )}
                    {...props}
                    label="Ayuda"
                    onPress={() => {
                        props.navigation.navigate('Help');
                    }}
                />

                <DrawerItem
                    icon={(props) => (
                        <AppIcon
                            color={theme.colors.primaryMain}
                            size={props.size}
                            name="wallet"
                        />
                    )}
                    {...props}
                    label="Formas de pago"
                    onPress={() => {
                        props.navigation.navigate('PaymentMethods');
                    }}
                />

                <DrawerItem
                    icon={(props) => (
                        <Image
                            source={images.TERMS}
                            style={{
                                width: props.size,
                                height: props.size,
                                resizeMode: 'contain'
                            }}
                        />
                    )}
                    {...props}
                    label="Términos y condiciones"
                    onPress={() => {
                        linking.openURL(
                            'https://citybestapp.com/terminos-condiciones-y-politicas-de-privacidad'
                        );
                    }}
                />

                {/* <Division /> */}

                <DrawerItem
                    icon={(props) => (
                        <AppIcon
                            color={theme.colors.primaryMain}
                            size={props.size}
                            name="power"
                        />
                    )}
                    {...props}

                    label="Salir"
                    onPress={async () => {
                        await logout();
                    }}
                />
            </DrawerContentScrollView>
        </>
    );
}

export function MenuSectionTitle({ title }: { title: string }) {
    return (
        <Box ml="m" mt="s">
            <Text color="primaryMain" variant="heading2">
                {title}
            </Text>
        </Box>
    );
}

function Division() {
    return (
        <Box mb="s" borderBottomColor="greyMain" borderBottomWidth={1.5}></Box>
    );
}

function DrawerHeader() {
    const { data: user, loading } = useGetProfile();
    const [FinalUser, setFinalUser] = useState({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        profilePictureUrl: user?.profilePictureUrl ?? ''
    })
    const profileState = useSelector(getProfileState)
    useEffect(() => {
        if (profileState.firstName !== "") {
            setFinalUser({
                firstName: profileState?.firstName ?? '',
                lastName: profileState?.lastName ?? '',
                email: profileState?.email ?? '',
                profilePictureUrl: profileState?.profilePictureUrl ?? ''
            })
        } else {
            setFinalUser({
                firstName: user?.firstName ?? '',
                lastName: user?.lastName ?? '',
                email: user?.email ?? '',
                profilePictureUrl: user?.profilePictureUrl ?? ''
            })
        }
    }, [profileState, user])


    return (
        <Box
            top={-statusBarHeight - 10}
            height={220}
            backgroundColor="primaryMain"
            justifyContent="center"
        >
            <Box
                style={{
                    width: 120,
                    height: 120,
                    position: 'absolute',
                    top: 0
                }}
            >
                <Image
                    resizeMode="cover"
                    style={{ width: '100%', height: '100%' }}
                    source={images.MAIN_ARROW}
                />
            </Box>

            <Box mt="l">
                <Box
                    width="100%"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    mb="s"
                >
                    <Image
                        resizeMode="cover"
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: FinalUser?.profilePictureUrl ? 120 / 2 : 0
                        }}
                        source={
                            FinalUser?.profilePictureUrl
                                ? { uri: FinalUser?.profilePictureUrl }
                                : images.DEFAULT_PHOTO
                        }
                    />
                </Box>
                <Box>
                    <Box mb="s">
                        <Text
                            bold
                            variant="heading2"
                            color="white"
                            align="center"
                        >
                            {!FinalUser
                                ? ''
                                : `${FinalUser?.firstName ?? ''} ${FinalUser?.lastName ?? ''
                                }`}
                        </Text>
                    </Box>

                    <Text color="white" align="center">
                        {!FinalUser ? '' : FinalUser?.email}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}
