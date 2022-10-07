
import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import SelectInput from '@main-components/Form/inputs/SelectInput';
import TextInput from '@main-components/Form/inputs/TextInput';
import Text from '@main-components/Text';
import useGetCards from '@modules/user/application/hooks/use-get-cards';
import { getCardErrorMessage } from '@modules/user/ui/screens/AddCard/components/CardForm';
import FormField from '@modules/_shared/form/FormField';
import { maxLength, minLength, required } from '@modules/_shared/form/validate';
import { defaultIso2Country, getDeviceState } from 'config/Device/store/device.slice';
import { MP_PUBLIC_KEY } from 'MPConstants';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

export default function UseCardForm({
    onPay,
    setPaying,
    CustomFormToolbar
}: {
    onPay: any;
    setPaying: any;
    CustomFormToolbar: any;
}) {
    const [loading, setLoading] = useState(false);
    const [attempt, setAttempt] = useState(0);

    const webViewRef = useRef<any>(null);
    const { data: userCards, loading: loadingCards } = useGetCards();
    
    const deviceState = useSelector(getDeviceState)

     
    const publishableKeyJSCode = `window.Mercadopago.setPublishableKey(
        "${MP_PUBLIC_KEY[deviceState.iso2Country || defaultIso2Country]}",
      );`;

    return (
        <Box padding="m" backgroundColor="white" borderRadius={20}>
            <Box height={0}>
                <WebView
                    ref={webViewRef}
                    key={'card.mp' + attempt}
                    nativeID="card.mp"
                    style={{
                        flex: 0,
                        width: '100%',
                        height: 0
                    }}
                    originWhitelist={['*']}
                    source={{ uri: 'https://landing-citybest.vercel.app/mp-add-card' }}
                    javaScriptEnabled={true}
                    onMessage={(event) => {
                        const data = JSON.parse(event.nativeEvent.data);
                        console.log("PETICION CARD===>",data)
                        if (data.ok) {
                            setAttempt(attempt + 1);
                            onPay(data.cardTokenId);
                        } else {
                            setPaying(false);
                            setAttempt(attempt + 1);

                            Alert.alert(
                                'Error',
                                getCardErrorMessage(data.errorCode)
                            );
                        }
                    }}
                    incognito={true}
                    allowFileAccess={true}
                    geolocationEnabled={true}
                    domStorageEnabled={true}
                    injectedJavaScript={publishableKeyJSCode}
                />
            </Box>

            <Form
                onSubmit={() => {}}
                toolbar={
                    <CustomFormToolbar
                        webViewRef={webViewRef}
                        setLoading={setLoading}
                        loading={loading}
                    />
                }
                defaultValues={{}}
                Wrapper={(props) => <Box width="100%">{props.children}</Box>}
            >
                <SelectInput
                    source="cardId"
                    options={
                        userCards
                            ? userCards.map((card: any) => ({
                                  id: card.id,
                                  name: `${card.type.toUpperCase()} ${card.firstSixDigits.slice(
                                      0,
                                      4
                                  )} ${card.firstSixDigits.slice(
                                      4,
                                      6
                                  )}xx xxxx ${card.lastFourDigits}`
                              }))
                            : []
                    }
                    placeholder="Selecciona una tarjeta"
                    validate={required('Por favor, selecciona una tarjeta')}
                />

                <CardRestInput userCards={userCards} />
            </Form>
        </Box>
    );
}

function CardRestInput({
    userCards,
    ...rest
}: {
    userCards: any[];
    [prop: string]: any;
}) {
    const { watch } = useFormContext();

    const values = watch(['cardId']);

    if (!values.cardId) return <Box></Box>;
    const selectedCard = (
        values.cardId ? userCards.filter((c) => c.id === values.cardId) : []
    )[0];

    return (
        <Box>
            <Box flexDirection="row" alignItems="center">
                <Box>
                    <Box>
                        <Text variant="small" bold>
                            Completa tu tarjeta
                        </Text>
                    </Box>

                    <Box flexDirection="row" alignItems="center" mr="m">
                        <Box>
                            <Text>{selectedCard.firstSixDigits}</Text>
                        </Box>
                        <Box width={90}>
                            <FormField
                                component={
                                    <TextInput
                                        placeholder="_ _ _ _ _ _"
                                        mode="flat"
                                        autoFocus={true}
                                        keyboardType="decimal-pad"
                                        filterText={(t) => {
                                            const maxLength = 6;
                                            let valid = new RegExp(
                                                String.raw`/^\d{1,${maxLength}}$/`
                                            ).test(t);

                                            return valid
                                                ? t
                                                : t.slice(0, maxLength);
                                        }}
                                    />
                                }
                                control={rest.control}
                                defaultValue={
                                    rest.defaultValues &&
                                    rest.defaultValues['cardRest']
                                }
                                source={'cardRest'}
                                validate={[required(' ')]}
                            />
                        </Box>
                        <Box>
                            <Text>{selectedCard.lastFourDigits}</Text>
                        </Box>
                    </Box>
                </Box>

                <Box flex={1}>
                    <FormField
                        component={
                            <TextInput
                                label={() => (
                                    <Text variant="small" bold>
                                        CVV
                                    </Text>
                                )}
                                placeholder="CVV"
                                keyboardType="decimal-pad"
                                filterText={(t) => {
                                    const maxLength = 4;
                                    let valid = new RegExp(
                                        String.raw`/^\d{1,${maxLength}}$/`
                                    ).test(t);

                                    return valid ? t : t.slice(0, maxLength);
                                }}
                            />
                        }
                        control={rest.control}
                        defaultValue={
                            rest.defaultValues &&
                            rest.defaultValues['securityCode']
                        }
                        source={'securityCode'}
                        validate={[
                            required('Ingresa CVV'),
                            minLength(3, '3 a 4 dígitos'),
                            maxLength(4, '3 a 4 dígitos')
                            /* onlyNumbers('Ingresa solo números') */
                        ]}
                    />
                </Box>
            </Box>
        </Box>
    );
}
