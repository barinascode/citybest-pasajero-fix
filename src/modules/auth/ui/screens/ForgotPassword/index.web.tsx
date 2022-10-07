import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import EmailTextInput from '@main-components/Form/inputs/EmailTextInput';
import SaveButton from '@main-components/Form/SaveButton';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useForgotPassword from '@modules/auth/application/hooks/use-forgot-password';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import { required } from '@shared/form/validate';
import React from 'react';

interface ForgotPasswordProps {
    show: boolean;
    onClose: any;
    onSuccess?: any;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
    const theme = useTheme();
    const { forgotPassword, loading } = useForgotPassword();

    const containerStyle = {
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 25,
        width: '40%',
        marginHorizontal: 'auto',
        borderRadius: theme.borderRadius.m
    };

    return (
        <Modal
            visible={props.show}
            onDismiss={props.onClose}
            contentContainerStyle={containerStyle}
        >
            <Box
                flex={1}
                bg="white"
                // p="s"
                borderTopRightRadius={25}
                borderTopLeftRadius={25}
            >
                <Text variant="heading2">Recupera tu contraseña</Text>

                <Box mt="m" mb="m">
                    <Text variant="body">
                        Ingresa el correo electrónico con que te registraste en
                        AsídeRápido, allí te enviaremos las instrucciones sobre
                        como recuperar tu contraseña
                    </Text>
                </Box>

                <Form
                    onSubmit={() => {}}
                    toolbar={
                        <Box width="30%">
                            <SaveButton
                                label="Continuar"
                                mode="contained"
                                loading={loading}
                                onSubmit={async (fields) => {
                                    if (!fields.email) {
                                        return;
                                    }
                                    try {
                                        await forgotPassword(fields.email);
                                        props.onSuccess && props.onSuccess();
                                    } catch (error) {}
                                }}
                            />
                        </Box>
                    }
                >
                    <EmailTextInput
                        leftIcon={{
                            name: 'email',
                            size: 'm'
                        }}
                        source="email"
                        label="Correo electrónico"
                        placeholder="Ingresa tu correo electrónico"
                        validate={required('Escribe tu correo electrónico')}
                    />
                </Form>
            </Box>
        </Modal>
    );
}
