import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Image from '@main-components/Image';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useGetActiveTripRequest from '@modules/request/application/hooks/use-get-trip-request';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import {
    Theme,
    useTheme
} from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import { getDeviceState } from 'config/Device/store/device.slice';
import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import {Image as Image2} from 'react-native'

interface DashboardMenuProps {
    onOpenMenu: any;
    onRequestTrip: any;
}

export default function DashboardMenu({
    onOpenMenu,
    onRequestTrip
}: DashboardMenuProps) {
    const theme = useTheme();
    const deviceState = useSelector(getDeviceState)

    const [showComingSoonAlert, setShowComingSoonAlert] = useState(false);
    const { linking } = useUtils();
   
    return (
        <Box
            flexDirection="row"
            justifyContent="center"
            style={{
                width: '100%'
            }}
        >
            <Box style={{
                padding: 1,
            }} flex={0.3}>
                <MenuItem
                    onPress={() => {
                        onOpenMenu();
                    }}
                    icon={
                        <AppIcon
                            name="menu"
                            size={30}
                            color={theme.colors.primaryMain}
                        />
                    }
                    label="Menú"
                    labelColor="primaryMain"
                    backgroundColor={theme.colors.white}
                />
            </Box>
            <Box style={{ padding: 1 }} flex={0.3}>

                    {
                    (deviceState.iso2Country === 'CL')
                        ?
                        
                        <MenuItem
                    onPress={() => {
                        //   setShowComingSoonAlert(true);
                        if(Platform.OS === 'android')
                                linking.openURL('https://chile.payu.com/clientes');
                            
                        if(Platform.OS === 'ios')
                            linking.openURL('https://chile.payu.com/clientes/');

                    }}
                    
                    icon={
                        <Image2
                            source={images.FPAY1}
                            style={{
                                margin : 0,
                                width:60,
                                height: 60,
                                resizeMode: 'contain',
                                position : 'relative',
                                top: -15
                            }}
                        />
                    }
                    
                    labelColor="white"
                    backgroundColor={theme.colors.primaryMain}
                    label={'Obtén tu cuenta aquí'}
                    
                /> 
                        :
                        <MenuItem
                    onPress={() => {
                        //   setShowComingSoonAlert(true);
                        linking.openURL('https://www.mercadopago.com.co');
                    }}
                    icon={
                        
                        <Image
                            source={images.MERCADO_PAGO}
                            style={{
                                width: 90,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                    }
                    label={
                        <Box
                            flexDirection="row"
                            height={10}
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Text style={{
                                fontWeight: 'bold'
                            }} align="center" variant="small" color="white">
                                {/* Paraderos E-bus */}
                                Obtén tu cuenta
                            </Text>
                        </Box>
                    }
                    labelColor="white"
                    backgroundColor={theme.colors.primaryMain}
                />

                    }
                
                
            </Box>
            <Box style={{ padding: 1 }} flex={0.4}>
                <MenuItem
                    onPress={() => {
                        onRequestTrip();
                    }}
                    icon={
                        <Box
                            flexDirection="row"
                            height={27}
                            style={{
                                marginTop: 10
                            }}
                            alignItems="center"
                            justifyContent="center"

                        >
                            <Image2
                                source={images.BUTTON_TRIP}
                                style={{
                                    resizeMode: 'contain',
                                    width: 150,
                                    height: 80
                                }}
                            />
                        </Box>
                    }
                    label=""
                    labelColor="white"
                    backgroundColor={theme.colors.primaryMain}
                />
            </Box>
            <ComingSoonAlert
                show={showComingSoonAlert}
                onDismiss={() => {
                    setShowComingSoonAlert(false);
                }}
            />
        </Box>
    );
}

function MenuItem({
    icon,
    label,
    labelColor,
    backgroundColor,
    disabled,
    onPress
}: {
    icon?: JSX.Element;
    label: string | JSX.Element;
    labelColor: keyof Theme['colors'];
    backgroundColor: string;
    disabled?: boolean;
    onPress?: any;
}) {
    const Wrapper = onPress ? TouchableOpacity : Box;
    return (
        <Wrapper
            disabled={disabled}
            onPress={onPress}
            style={{
                alignItems: 'center',
                width: '100%',
                padding: 10,
                backgroundColor,
                borderRadius: 4,
                height: 60,
                flexDirection: 'column',
                justifyContent: 'center',
                zIndex: 1,
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                
            }}
        >
            <Box mb="xs" height={30}>
                {icon}
            </Box>
            <Box>
                {typeof label == 'string' ? (
                    <Text
                        numberOfLines={1}
                        align="center"
                        variant="body"
                        color={labelColor}
                        style={{
                            fontWeight: 'bold',
                            fontSize : 10
                        }}
                    >
                        {label}
                    </Text>
                ) : (
                    label
                )}
            </Box>
        </Wrapper>
    );
}

function ComingSoonAlert({ show, onDismiss }: any) {
    return (
        <Modal
            contentContainerStyle={{
                /*    marginHorizontal: 10, */
                width: '50%'

                /*   padding: theme.spacing.s */
            }}
            onDismiss={() => {
                onDismiss();
            }}
            visible={show}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
            }}
        >
            <Box alignItems="center">
                <Text align="center">Próximamente!</Text>

                <Box mt="m">
                    <Button
                        title="Ok"
                        size="s"
                        style={{ width: 100 }}
                        labelStyle={{
                            fontSize: 12
                        }}
                        onPress={() => {
                            onDismiss();
                        }}
                    />
                </Box>
            </Box>
        </Modal>
    );
}

export function AnimatedBottomBar(props: DashboardMenuProps) {
    const dimensions = useDimensions();
    const initialPosition = { x: 0, y: dimensions.height * 2 };
    const targetPosition = { x: 0, y: 0 };

    const translateX = useSharedValue(initialPosition.x);
    const translateY = useSharedValue(initialPosition.y);

    useEffect(() => {
        translateY.value = initialPosition.y;
        translateY.value = withSpring(targetPosition.y, {
            damping: 20,
            stiffness: 90
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            bottom: 5,
            zIndex: 9999,
            width: dimensions.width,
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        };
    });

    return (
        <Animated.View style={{ ...animatedStyle }}>
            <DashboardMenu {...props} />
        </Animated.View>
    );
}

export function BottomBarController(props: { onOpenMenu: any }) {
    const { request } = useGetActiveTripRequest();
    const { trip } = useGetActiveTrip();

    const {
        showRequestOptions,
        showRequestModal,
        setShowRequestModal,
        showPickLocation
    } = useDashboardContextProvider((state) => ({
        setShowRequestOptions: state.setShowRequestOptions,
        showRequestOptions: state.showRequestOptions,
        showRequestModal: state.showRequestModal,
        setShowRequestModal: state.setShowRequestModal,
        showPickLocation: state.showPickLocation
    }));

    const hide =
        request ||
        showRequestOptions ||
        showRequestModal ||
        trip ||
        showPickLocation;

    if (hide) return <Box />;

    return (
        <AnimatedBottomBar
            onOpenMenu={props.onOpenMenu}
            onRequestTrip={() => {
                setShowRequestModal(true);
            }}
        />
    );
}
