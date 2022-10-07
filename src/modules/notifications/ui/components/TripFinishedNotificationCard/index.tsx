import ActivityIndicator from '@main-components/ActivityIndicator';
import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import SaveButton from '@main-components/Form/SaveButton';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import usePayTrip from '@modules/trip/application/hooks/use-pay-trip';
import UseCardForm from '@modules/trip/ui/components/UseCardForm';
import useGetCards from '@modules/user/application/hooks/use-get-cards';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { PaymentMethod } from '@modules/_shared/domain/models/trip-types';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import { getDeviceState } from 'config/Device/store/device.slice';
import React, { useState } from 'react';
import { Alert, Linking, Platform, View } from 'react-native';
import { useSelector } from 'react-redux';
import TripNotificationCard from '../TripNotificationCard';

interface TripFinishedNotificationCardProps {
    finalFee: {
        amount: number;
        currency: string;
    };
    onPay: any;
    paying: boolean;
    paymentMethod: PaymentMethod;
    payError?: string;
}

function CashPaymentCardContent(props: {
    finalFee: {
        amount: number;
        currency: string;
    };
    onPay: any;
    paying: boolean;
}) {
    const theme = useTheme();

    return (
        <Box height={200} justifyContent="center" alignItems="center">
            <Header finalFee={props.finalFee} />

            <Box mt="l">
                <Button
                    onPress={() => {
                        props.onPay();
                    }}
                    rounded={false}
                    title="Pagar"
                    backgroundColor="successMain"
                    loading={props.paying}
                    disabled={props.paying}
                />
            </Box>
        </Box>
    );
}




function QRPaymentCardContent(props: {
    finalFee: {
        amount: number;
        currency: string;
    };
}) {
    const theme = useTheme();
    const deviceState = useSelector(getDeviceState)
    const { linking } = useUtils();
    return (
        <Box height={300} justifyContent="center" alignItems="center">
            <Header finalFee={props.finalFee} />

            <Box mt="m">
                <Text bold color="white" align="center">
                    Pide al conductor el código QR y escanea con la App oficial
                    de {(deviceState.iso2Country === 'CL') ? 'Fpay' : 'Mercado Pago'}

                </Text>
            </Box>

            <Box mt="l">
                <Button
                    onPress={async () => {

                        if (deviceState.iso2Country === 'CL') {

                            if (Platform.OS === 'android')
                                linking.openURL('market://details?id=com.fif.fpay.android');

                            if (Platform.OS === 'ios')
                                linking.openURL('https://apps.apple.com/cl/app/fpay/id1482308819');

                        }
                        else {
                            linking.openURL('https://www.mercadopago.com/instore/merchant/qr');
                        }
                    }}
                    rounded={false}
                    title={(deviceState.iso2Country === 'CL') ? 'Abrir App Fpay ' : 'Abrir Mercado Pago App'}
                    backgroundColor="successMain"
                />
            </Box>
        </Box>
    );
}

function CardPaymentCardContent(props: {
    finalFee: {
        amount: number;
        currency: string;
    };
    onPay: any;
    paying: boolean;
    payError?: string;
}) {
    const theme = useTheme();
    /*  const [cardToken, setCardToken] = useState(); */
    const [paid, setPaid] = useState(false);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState<any>(undefined);
    const deviceState = useSelector(getDeviceState)


    const { data: userCards, loading: loadingCards } = useGetCards();

    function pay(cardToken: string) {
        props
            .onPay(cardToken)
            .then((res: any) => {
                if (res && res.data && res.data.ok) {
                    setPaid(true);
                } else {
                    /* setError(undefined); */
                }
            })
            .finally(() => {
                setPaying(false);
            });
    }

    function FormToolbar({ webViewRef }: { webViewRef: any }) {


        const sendDataToWebView = (data: any) => {
            webViewRef.current.postMessage(JSON.stringify(data));
        };

        const isLoading = paying;

        return (
            <Box mt="m">
                <SaveButton
                    rounded={false}
                    label="Pagar"
                    backgroundColor="successMain"
                    loading={isLoading}
                    uppercase={false}
                    onSubmit={async (data) => {
                        setPaying(true);
                        const selectedCard = (
                            data.cardId
                                ? userCards.filter((c) => c.id === data.cardId)
                                : []
                        )[0];
                        const cardNumber = `${selectedCard.firstSixDigits}${data.cardRest}${selectedCard.lastFourDigits}`;
                        const finalData = {
                            ...data,
                            ...selectedCard.cardInfo,
                            cardNumber: cardNumber,
                            email: 'jaimedaniel@gmail.com' || `${selectedCard.id}@citybest.com`,
                            docNumber: data.docNumber ? data.docNumber : '123456789'
                        };

                        sendDataToWebView(finalData);
                    }}
                    disabled={isLoading || paid}
                />
            </Box>
        );
    }

    return (
        <Box justifyContent="center" alignItems="center">
            <Header finalFee={props.finalFee} />

            <Box mt="s" width="100%">
                <Box justifyContent="center" mt="m">
                    {paying && (
                        <Box justifyContent="center" alignItems="center" mb="m">
                            <ActivityIndicator size="small" color="white" />
                            <Box mt="m">
                                <Text color="white" bold align="center">
                                    Pagando...
                                </Text>
                            </Box>
                        </Box>
                    )}

                    {props.payError && !paying && (
                        <Box
                            backgroundColor="white"
                            borderRadius={30}
                            p="m"
                            mb="m"
                        >
                            <Text color="dangerMain" align="center">
                                {getErrorMessage(props.payError)}
                            </Text>
                        </Box>
                    )}


                    {deviceState.iso2Country !== 'CL' && <Box style={{ display: paying ? 'none' : undefined }}>

                        <UseCardForm
                            onPay={pay}
                            CustomFormToolbar={FormToolbar}
                            setPaying={(paying: boolean) => {
                                setPaying(paying);
                            }}
                        />
                    </Box>
                    }
    
                {deviceState.iso2Country == 'CL' && <Box>
                    <Box mb={'s'}>
                        <Text bold color="white" align="center">
                            Pide al conductor el código QR y escanea con la App oficial
                            de {(deviceState.iso2Country == 'CL') ? 'Fpay' : 'Mercado Pago'}
                        </Text>
                    </Box>
                </Box>}
                    
                {deviceState.iso2Country == 'CL' && <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                            style={{
                                width: 200,
                                marginTop : 10
                            }}
                            onPress={async () => {

                                if (deviceState.iso2Country === 'CL') {

                                    if (Platform.OS === 'android')
                                        Linking.openURL('market://details?id=com.fif.fpay.android');

                                    if (Platform.OS === 'ios')
                                        Linking.openURL('https://apps.apple.com/cl/app/fpay/id1482308819');

                                }
                                else {
                                    Linking.openURL('https://www.mercadopago.com/instore/merchant/qr');
                                }
                            }}
                            rounded={false}
                            title={(deviceState.iso2Country === 'CL') ? 'Abrir App Fpay ' : 'Abrir Mercado Pago App'}
                            backgroundColor="successMain"
                        />
                    </View>} 
                    
                    


                </Box>
            </Box>
        </Box>
    );
}

function getErrorMessage(error: string) {
    switch (error.toLowerCase()) {
        case 'cc_rejected_insufficient_amount':
            return 'Hubo un error al pagar el viaje: Fondos insufientes';

        case 'cc_rejected_bad_filled_card_number':
            return 'Hubo un error al pagar el viaje: Número de tarjeta incorrecta';

        case 'cc_rejected_bad_filled_security_code':
            return 'Hubo un error al pagar el viaje: CVV incorrecto';

        case 'cc_rejected_bad_filled_date':
            return 'Hubo un error al pagar el viaje: Tarjeta vencida o fecha de expiración incorrecta';

        case 'cc_rejected_call_for_authorize':
            return 'Tarjeta no habilitada para pagos en linea. Contáctate con tu banco para habilitar.';

        case 'cc_rejected_other_reason':
            return 'Hubo un error al pagar el viaje: Error desconocido al cobrar tu tarjeta';

        default:
            return 'Hubo un error al pagar el viaje. Inténtalo nuevamente o comunicate con soporte';
    }
}

function Header(props: {
    finalFee: {
        amount: number;
        currency: string;
    };
}) {
    const theme = useTheme();


    return (
        <>
            <Box>
                <AppIcon
                    color={theme.colors.successMain}
                    name="check-1"
                    size={30}
                />
            </Box>
            <Box mb="s" mt="m">
                {

                }
                <Text color="white">Has llegado a tu destino</Text>
            </Box>
            <Text color="white">Monto total a pagar:</Text>

            <Box mt="m">
                <Text variant="heading2" bold color="white">
                    {props.finalFee.currency} {props.finalFee.amount}
                </Text>
            </Box>
        </>
    );
}


export default function TripFinishedNotificationCard(
    props: TripFinishedNotificationCardProps
) {
    const theme = useTheme();

    return (
        <TripNotificationCard>
            {props.paymentMethod === 'CASH' && (
                <CashPaymentCardContent
                    onPay={props.onPay}
                    finalFee={props.finalFee}
                    paying={props.paying}
                />
            )}

            {props.paymentMethod === 'QR' && (
                <QRPaymentCardContent finalFee={props.finalFee} />
            )}

            {props.paymentMethod === 'CREDIT.CARD' && (
                <CardPaymentCardContent
                    onPay={props.onPay}
                    finalFee={props.finalFee}
                    paying={props.paying}
                    payError={props.payError}
                />
            )}
        </TripNotificationCard>
    );
}

export function TripFinishedNotificationCardController() {
    const { trip } = useGetActiveTrip();
    const { pay, loading: paying, error } = usePayTrip();

    const active =
        !!trip &&
        trip.status === 'FINISHED' &&
        trip.isCharged &&
        !trip.isPaid &&
        !trip.isRated;

    return (
        <Modal
            visible={active}
            contentContainerStyle={{
                backgroundColor: 'transparent'
            }}
        >
            {trip ? (
                <TripFinishedNotificationCard
                    finalFee={trip.finalFee}
                    onPay={(cardToken?: string) => pay(trip.id, cardToken)}
                    paying={paying}
                    paymentMethod={trip.paymentMethod}
                    payError={error?.message}
                />
            ) : null}
        </Modal>
    );
}
