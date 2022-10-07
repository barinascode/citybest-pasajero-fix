import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import EmailTextInput from '@main-components/Form/inputs/EmailTextInput';
import SelectInput from '@main-components/Form/inputs/SelectInput';
import TextInput from '@main-components/Form/inputs/TextInput';
import useGetCardIdentificationTypes from '@modules/trip/application/hooks/use-get-card-identification-types';
import FormField from '@modules/_shared/form/FormField';
import { maxLength, minLength, required } from '@modules/_shared/form/validate';
import { AppDocumentTypes } from 'config/AppDocumentTypes';
import React, { useRef, useState } from 'react';

export default function SecondaryCardForm({
    setCardToken,
    CustomFormToolbar
}: {
    setCardToken: any;
    CustomFormToolbar: any;
}) {
    const { data } = useGetCardIdentificationTypes();

    const [loading, setLoading] = useState(false);

    const webViewRef = useRef<any>(null);

    return (
        <Box padding="m">
            <Form
                onSubmit={() => {}}
                toolbar={
                    <CustomFormToolbar
                        webViewRef={webViewRef}
                        setLoading={setLoading}
                        loading={loading}
                    />
                }
                defaultValues={
                    {
                        /* cardNumber: '4013 5406 8274 6260',
                    cardholderName: 'APRO',
                    cardExpirationMonth: '11',
                    cardExpirationYear: '2025',
                    securityCode: '123',
                    docType: 'CC',
                    docNumber: '123456789',
                    email: 'x@testuser.com' */
                    }
                }
            >
                <TextInput
                    source="cardNumber"
                    placeholder="Número de tarjeta"
                    validate={[
                        required(),
                        minLength(16, 'Mínimo 16 números'),
                        maxLength(19, 'Máximo 19 números')
                    ]}
                    mode="flat"
                    autoFocus={true}
                    keyboardType="decimal-pad"
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
                            'El formato del CVV debe ser entre 3 y 4 dígitos'
                        ),
                        maxLength(
                            4,
                            'El formato del CVV debe ser entre 3 y 4 dígitos'
                        )
                        /* onlyNumbers('Ingresa solo números') */
                    ]}
                    mode="flat"
                    keyboardType="decimal-pad"
                />

                <SelectInput
                    source={'docType'}
                    // options={data ?? []}
                    options={AppDocumentTypes}
                    placeholder="Selecciona una opción"
                    validate={required()}
                />

                <TextInput
                    source="docNumber"
                    placeholder="Número de documento"
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

function CardExpirationInput(props) {
    return (
        <Box flexDirection="row">
            <Box mr="s" flex={1}>
                <FormField
                    component={
                        <TextInput
                            placeholder="Mes de expiración (MM)"
                            mode="flat"
                            keyboardType="decimal-pad"
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
                            'El formato del mes debe ser de 2 dígitos'
                        ),
                        maxLength(2, 'El formato del mes debe ser de 2 dígitos')
                        /* onlyNumbers('Ingresa solo números') */
                    ]}
                />
            </Box>
            <Box flex={1}>
                <FormField
                    component={
                        <TextInput
                            placeholder="Año de expiración (YYYY)"
                            mode="flat"
                            keyboardType="decimal-pad"
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
                            'El formato del año debe ser de 4 dígitos'
                        ),
                        maxLength(4, 'El formato del año debe ser de 4 dígitos')
                        /* onlyNumbers('Ingresa solo números') */
                    ]}
                />
            </Box>
        </Box>
    );
}
