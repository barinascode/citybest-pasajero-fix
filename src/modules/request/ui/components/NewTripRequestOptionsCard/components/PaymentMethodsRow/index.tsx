import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import useGetCards from '@modules/user/application/hooks/use-get-cards';
import useDevice from '@modules/_shared/domain/hooks/use-device';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/core';
import { getDeviceState } from 'config/Device/store/device.slice';
import React, { useState } from 'react';
import { Alert, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

interface PaymentMethodsRowProps {
    onSelect: any;
    selected: string;
    onSelectAndRequest: any;
}

export function PaymentMethodsRow(props: PaymentMethodsRowProps) {
    const { data: userCards, loading: loadingCards } = useGetCards();

    const { navigate } = useNavigation();

    const { linking } = useUtils();

    const { platform } = useDevice();

    const deviceState = useSelector(getDeviceState)
    
    const [selected, setSelected] = useState("") 

    return (
        <Box height={60} alignItems="center" flexDirection="row">
            <Box mr="s" flex={1}>
                <PaymentMethod
                    label="Efectivo"
                    image={images.CASH_METHOD}
                    selected={props.selected === 'CASH'}
                    onPress={() => {
                        props.onSelect('CASH');
                    }}
                    iconStyle={{ width: 40 }}
                />
            </Box>
            <Box mr="s" flex={1}>

                    {
                        (deviceState.iso2Country === 'CL')
                        ?
                    <PaymentMethod
                    label="Código QR"
                    image={images.FPAY_QR}
                    iconStyle={{ width: 60 }}
                    selected={selected === 'qr'}
                    onPress={() => {

                        // Alert.alert(
                        //     'Necesitas la App de Fpay',
                        //     'Recuerda que debes tener la App de Fpay instalada, para poder escanear el código QR y asi poder pagar con tu metodo de pago de preferencia.',
                        //     [
                        //         {
                        //             text: 'Ya tengo la App. Solicitar viaje',
                        //             onPress: () => {
                        //                 setSelected('qr')
                        //                 props.onSelectAndRequest('QR');
                        //             }
                        //         },
                        //         {
                        //             text: 'Descargar App Fpay',
                        //             onPress: () => {

                        //                 if (platform === 'Android') {
                        //                     linking.openURL(
                        //                         'market://details?id=com.fif.fpay.android'
                        //                     );

                        //                     return;
                        //                 }

                        //                 linking.openURL(
                        //                     'https://apps.apple.com/cl/app/fpay/id1482308819'
                        //                 );
                        //             }
                        //         },
                        //         {
                        //             text: 'Cancelar',
                        //             onPress: () => {}
                        //         }
                        //     ],
                        //     { cancelable: true }
                        // );

                        Alert.alert(
                            'Función habilitada próximamente',
                            'Estamos trabajando en ello.',
                            [   
                                {
                                    text: 'Ok',
                                    onPress: () => {}
                                }
                            ],
                            { cancelable: true }
                        );

                    }}
                />
                        :

                        <PaymentMethod
                    label="Código QR"
                    image={images.MERCADO_PAGO}
                    iconStyle={{ width: 60 }}
                    selected={props.selected === 'QR'}
                    onPress={() => {
                        Alert.alert(
                            'Necesitas la App de Mercado Pago',
                            'Recuerda que debes tener la App de Mercado Pago instalada para poder escanear el código QR',
                            [
                                {
                                    text: 'Ya tengo la App. Solicitar viaje',
                                    onPress: () => {
                                        props.onSelectAndRequest('QR');
                                    }
                                },
                                {
                                    text: 'Descargar App Mercado Pago',
                                    onPress: () => {
                                        if (platform === 'Android') {
                                            linking.openURL(
                                                'https://play.google.com/store/apps/details?id=com.mercadopago.wallet&hl=es&gl=CO'
                                            );

                                            return;
                                        }

                                        linking.openURL(
                                            'https://apps.apple.com/ar/app/mercado-pago/id925436649'
                                        );
                                    }
                                },
                                {
                                    text: 'Cancelar',
                                    onPress: () => {}
                                }
                            ],
                            { cancelable: true }
                        );
                    }}
                />
                    }

                
            </Box>

           <Box flex={1}>

                    {
                         (deviceState.iso2Country === 'CL')
                         ?
                    
                <PaymentMethod
                    label="Débito/Crédito"
                    image={images.FPAY_QR}
                    iconStyle={{ width: 60 }}
                    selected={selected==='debito'}
                    onPress={() => {
                        // Alert.alert(
                        //     'Necesitas la App de Fpay',
                        //     `Recuerda que debes tener la App de Fpay instalada, para poder acreditar tus tarjetas de débito/crédito y así pagar con tu método de pago de preferencia.`,
                        //     [
                        //         {
                        //             text: 'Ya tengo la App. Solicitar viaje',
                        //             onPress: () => {
                        //                 setSelected('debito')
                        //                 props.onSelectAndRequest('CREDIT.CARD');
                        //             }
                        //         },
                        //         {
                        //             text: 'Descargar App Fpay',
                        //             onPress: () => {
                        //                 if (platform === 'Android') {
                        //                     linking.openURL(
                        //                         'market://details?id=com.fif.fpay.android'
                        //                     );

                        //                     return;
                        //                 }

                        //                 linking.openURL(
                        //                     'https://apps.apple.com/cl/app/fpay/id1482308819'
                        //                 );
                        //             }
                        //         },
                        //         {
                        //             text: 'Cancelar',
                        //             onPress: () => {}
                        //         }
                        //     ],
                        //     { cancelable: true }
                        // );

                        Alert.alert(
                            'Función habilitada próximamente',
                            'Estamos trabajando en ello.',
                            [   
                                {
                                    text: 'Ok',
                                    onPress: () => {}
                                }
                            ],
                            { cancelable: true }
                        );

                    }}
                />
                         :
                         <PaymentMethod
                    label="Débito/Crédito"
                    image={images.MERCADO_PAGO}
                    iconStyle={{ width: 60 }}
                    selected={props.selected === 'CREDIT.CARD'}
                    disabled={loadingCards}
                    onPress={() => {
                        if (!loadingCards && userCards.length === 0) {
                            Alert.alert(
                                'No tienes tarjetas',
                                'Agrega tu primera tarjeta para continuar con tu solicitud',
                                [
                                    { text: 'Cancelar' },
                                    {
                                        text: 'Agregar mi tarjeta',
                                        onPress: () => {
                                            navigate('AddCard', {
                                                goBack: true
                                            });
                                        }
                                    }
                                ]
                            );

                            return;
                        }
                        props.onSelect('CREDIT.CARD');
                    }}
                />
                    }
                
            </Box>

        </Box>
    );
}

export function PaymentMethod({
    label,
    image,
    selected = false,
    onPress,
    disabled,
    iconStyle
}: {
    label: string;
    image: ImageSourcePropType;
    selected?: boolean;
    onPress?: any;
    disabled?: boolean;
    iconStyle?: any;
}) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={{
                borderRadius: 8,
                backgroundColor: selected
                    ? theme.colors.successMain
                    : theme.colors.primaryMain,
                padding: 6,
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Image
                source={image}
                style={{
                    width: 60,
                    height: 35,
                    resizeMode: 'contain',
                    ...iconStyle
                }}
            />

            <Box>
                <Text variant="xsmall" color="white">
                    {label}
                </Text>
            </Box>
        </TouchableOpacity>
    );
}
