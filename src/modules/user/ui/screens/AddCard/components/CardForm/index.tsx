
import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import EmailTextInput from '@main-components/Form/inputs/EmailTextInput';
import SelectInput from '@main-components/Form/inputs/SelectInput';
import TextInput from '@main-components/Form/inputs/TextInput';
import FormField from '@modules/_shared/form/FormField';
import { maxLength, minLength, required } from '@modules/_shared/form/validate';
import { defaultIso2Country, getDeviceState } from 'config/Device/store/device.slice';
import { AppDocumentTypes } from 'config/DocumentsTypes/data/AppDocumentTypes';
import { MP_PUBLIC_KEY } from 'MPConstants';
import React,{ useRef, useState } from 'react';
import { Alert } from 'react-native';
// import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { WebView } from 'react-native-webview';

import { useSelector } from 'react-redux';

export default function CardForm({
    onAdd,
    CustomFormToolbar,
    setLoading
}: {
    onAdd: any;
    CustomFormToolbar?: any;
    setLoading: any;
}) {
   

    const deviceState = useSelector(getDeviceState)

    const webViewRef = useRef<any>(null);
    const [attempt, setAttempt] = useState(0);
    console.log('PUBLIC KEY===>',MP_PUBLIC_KEY[deviceState.iso2Country || defaultIso2Country])
    const publishableKeyJsCode = `window.Mercadopago.setPublishableKey(
        "${MP_PUBLIC_KEY[deviceState.iso2Country || defaultIso2Country]}",
      );`;
      //URL PRODUCCION===>https://citybestapp.com/mp-add-card

    return (
        <Box padding="m">
            <Box>
                <WebView
                    ref={webViewRef}
                    key={'card.mp'}
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
                        if (data.ok) {
                            console.log(data);
                            setLoading(false);
                            setAttempt(attempt + 1);
                            onAdd(data.cardTokenId);
                        } else {
                            setLoading(false);
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
                    injectedJavaScript={publishableKeyJsCode}
                />
            </Box>

            <Form
                onSubmit={() => {}}
                toolbar={
                    <CustomFormToolbar
                        webViewRef={webViewRef}
                        setLoading={setLoading}
                    />
                }
                defaultValues={
                    {
                    // cardNumber: '4013 5406 8274 6260',
                    // cardholderName: 'FUND',
                    // cardExpirationMonth: '11',
                    // cardExpirationYear: '2025',
                    // securityCode: '123',
                    // docType: 'CC',
                    // docNumber: '123456789',
                    // email: 'x@testuser.com'
                    }
                }
            >
                <TextInput
                    source="cardNumber"
                    placeholder="N??mero de tarjeta"
                    validate={[
                        required(),
                        minLength(16, 'M??nimo 16 n??meros'),
                        maxLength(19, 'M??ximo 19 n??meros')
                        /*  onlyNumbers('Solo numeros') */
                    ]}
                    mode="flat"
                    autoFocus={true}
                    keyboardType="decimal-pad"
                    filterText={(t) => {
                        const maxLength = 20;
                        let valid = new RegExp(
                            String.raw`/^\d{1,${maxLength}}$/`
                        ).test(t);

                        return valid ? t : t.slice(0, maxLength);
                    }}
                />

                <TextInput
                    source="cardholderName"
                    placeholder="Titular"
                    validate={required()}
                    mode="flat"
                />

                <CardExpirationInput manual />

                <TextInput
                    source="securityCode"
                    placeholder="CVV"
                    validate={[
                        required(),
                        minLength(
                            3,
                            'El formato del CVV debe ser entre 3 y 4 d??gitos'
                        ),
                        maxLength(
                            4,
                            'El formato del CVV debe ser entre 3 y 4 d??gitos'
                        )
                        /* onlyNumbers('Ingresa solo n??meros') */
                    ]}
                    mode="flat"
                    keyboardType="decimal-pad"
                    filterText={(t) => {
                        const maxLength = 4;
                        let valid = new RegExp(
                            String.raw`/^\d{1,${maxLength}}$/`
                        ).test(t);

                        return valid ? t : t.slice(0, maxLength);
                    }}
                />
                
                <SelectInput
                    source={'docType'}
                    options={ AppDocumentTypes.filter((item)=> item.country_document  == deviceState.iso2Country )}
                    placeholder="Selecciona una opci??n"
                    validate={required()}
                />
                <TextInput
                    source="docNumber"
                    placeholder="N??mero de documento"
                    validate={required()}
                    mode="flat"
                />

                <EmailTextInput
                    source="email"
                    placeholder="Email"
                    validate={required()}
                    mode="flat"
                />
            </Form>
        </Box>
    );
}

function CardExpirationInput(props:any) {
    return (
        <Box flexDirection="row">
            <Box mr="s" flex={1}>
                <FormField
                    component={
                        <TextInput
                            placeholder="Mes de expiraci??n (MM)"
                            mode="flat"
                            keyboardType="decimal-pad"
                            filterText={(t) => {
                                const maxLength = 2;
                                let valid = new RegExp(
                                    String.raw`/^\d{1,${maxLength}}$/`
                                ).test(t);

                                return valid ? t : t.slice(0, maxLength);
                            }}
                        />
                    }
                    control={props.control}
                    defaultValue={
                        props.defaultValues &&
                        props.defaultValues['cardExpirationMonth']
                    }
                    source={'cardExpirationMonth'}
                    validate={[
                        required(),
                        minLength(
                            2,
                            'El formato del mes debe ser de 2 d??gitos'
                        ),
                        maxLength(2, 'El formato del mes debe ser de 2 d??gitos')
                        /* onlyNumbers('Ingresa solo n??meros') */
                    ]}
                />
            </Box>
            <Box flex={1}>
                <FormField
                    component={
                        <TextInput
                            placeholder="A??o de expiraci??n (YYYY)"
                            mode="flat"
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
                    control={props.control}
                    defaultValue={
                        props.defaultValues &&
                        props.defaultValues['cardExpirationYear']
                    }
                    source={'cardExpirationYear'}
                    validate={[
                        required(),
                        minLength(
                            4,
                            'El formato del a??o debe ser de 4 d??gitos'
                        ),
                        maxLength(4, 'El formato del a??o debe ser de 4 d??gitos')
                        /* onlyNumbers('Ingresa solo n??meros') */
                    ]}
                />
            </Box>
        </Box>
    );
}

export function getCardErrorMessage(code: string) {
    switch (code) {
        case 'E301':
            return 'Numero de tarjeta inv??lido';
        case 'E302':
            return 'CVV inv??lido';
        case '324':
            return 'Documento inv??lido';

        case '325':
            return 'Mes de expiraci??n inv??lido';
        case '325':
            return 'A??o de expiraci??n inv??lido';
        default:
            return 'Error desconocido';
    }
}
