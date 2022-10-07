import BaseCodeInput from '@main-components/BaseInputs/BaseCodeInput';
import BottomSheet from '@main-components/BottomSheet';
import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import EmailTextInput from '@main-components/Form/inputs/EmailTextInput';
import PasswordInput from '@main-components/PasswordInput';
import Text from '@main-components/Text';
import useForgotPassword from '@modules/auth/application/hooks/use-forgot-password';
import useResetPassword from '@modules/auth/application/hooks/use-reset-password';
import useVerifyResetPasswordCode from '@modules/auth/application/hooks/use-verify-reset-password-code';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import { minLength, required } from '@shared/form/validate';
import React, { useEffect, useState } from 'react';

interface ForgotPasswordProps {
    show: boolean;
    onClose: any;
    onSuccess?: any;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
    const [codeSent, setCodeSent] = useState(false);
    const [code, setCode] = useState<any>(undefined);
    const [codeVerified, setCodeVerified] = useState<any>(false);

    const [validEmail, setValidEmail] = useState<any>(undefined);

    useEffect(() => {
        setCodeSent(false);
        setCodeVerified(false);
        setValidEmail(undefined);
    }, [props.show]);
    return (
        <BottomSheet
            open={props.show}
            onClose={props.onClose}
            enabledContentGestureInteraction={false}
            content={
                <Box
                    flex={1}
                    bg="white"
                    p="m"
                    borderTopRightRadius={25}
                    borderTopLeftRadius={25}
                    alignItems="center"
                >
                    <Text variant="heading2">Recupera tu contraseña</Text>

                    {!codeSent && (
                        <Step1
                            setCodeSent={setCodeSent}
                            setValidEmail={setValidEmail}
                        />
                    )}

                    {codeSent && !codeVerified && (
                        <Step2
                            setCode={setCode}
                            setCodeVerified={setCodeVerified}
                            email={validEmail}
                            codeVerified={codeVerified}
                        />
                    )}

                    {codeVerified && (
                        <Step3
                            onSuccess={props.onSuccess}
                            email={validEmail}
                            code={code}
                        />
                    )}
                </Box>
            }
            collapsedHeight={0}
            contentHeight={!codeSent ? 250 : 210}
        />
    );
}

function Step1({
    setCodeSent,
    setValidEmail
}: {
    setCodeSent: any;
    setValidEmail: any;
}) {
    const { forgotPassword, loading } = useForgotPassword();

    return (
        <>
            <Box mt="m" mb="l" alignItems="center">
                <Text variant="body" style={{ textAlign: 'center' }}>
                    Ingresa el correo electrónico con que te registraste en
                    Citybest
                </Text>
            </Box>

            <Form
                onSubmit={async (fields) => {
                    if (!fields.email) {
                        return;
                    }
                    try {
                        await forgotPassword(fields.email);
                        setValidEmail(fields.email);
                        setCodeSent(true);
                    } catch (error) {}
                }}
                saveButtonProps={{
                    uppercase: false,
                    label: 'Enviar',
                    loading: loading
                }}
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
        </>
    );
}

function Step2({
    email,
    setCode,
    setCodeVerified,
    codeVerified
}: {
    email: string;
    setCode: any;
    setCodeVerified: any;
    codeVerified: boolean;
}) {
    const theme = useTheme();

    const { verifyCode, loaded, loading, valid } = useVerifyResetPasswordCode();

    useEffect(() => {
        if (codeVerified) return;

        if (loaded && valid) {
            setCodeVerified(true);
        }
    }, [loaded, valid, codeVerified]);

    return (
        <>
            <Box mt="m" mb="l" alignItems="center">
                <Text variant="body" style={{ textAlign: 'center' }}>
                    Ingresa el código que enviamos a tu correo
                </Text>
            </Box>

            <BaseCodeInput
                onInputComplete={(introducedCode: string) => {
                    console.log(email, introducedCode);
                    setCode(introducedCode);
                    verifyCode(email, introducedCode);
                }}
                item={{
                    backgroundColor: theme.colors.greyLight,
                    borderRadius: 8,
                    borderBottomWidth: 0,
                    width: 35,
                    paddingLeft: 0,
                    height: 40,
                    textAlign: 'center'
                }}
            />
            {loading && (
                <Box mt="s">
                    <Text variant="small">Validando...</Text>
                </Box>
            )}
        </>
    );
}

function Step3({ onSuccess, email, code }) {
    const theme = useTheme();

    const { resetPassword, loaded, loading } = useResetPassword();

    return (
        <>
            <Box mt="m" mb="l" alignItems="center">
                <Text variant="body" style={{ textAlign: 'center' }}>
                    Ingresa tu nueva clave
                </Text>
            </Box>
            <Form
                onSubmit={async (fields) => {
                    if (!fields.password) return;
                    if (!email) return;
                    if (!code) return;

                    try {
                        await resetPassword(email, code, fields.password);
                        onSuccess();
                    } catch (error) {}
                }}
                saveButtonProps={{
                    label: 'Cambiar clave',
                    loading: loading,
                    uppercase: false
                }}
            >
                <PasswordInput
                    source="password"
                    placeholder="Nueva clave"
                    validate={
                        (required('Escribe tu nueva clave'),
                        minLength(
                            8,
                            'La clave debe contener al menos 8 caracteres'
                        ))
                    }
                />
            </Form>
        </>
    );
}
