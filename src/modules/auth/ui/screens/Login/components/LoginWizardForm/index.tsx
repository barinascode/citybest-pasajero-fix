import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import { FormStep, WizardForm } from '@main-components/Form';
import FormInput from '@main-components/Form/FormInput';
import useForm from '@main-components/Form/hooks/useForm';
import EmailTextInput from '@main-components/Form/inputs/EmailTextInput';
import PhoneTextInput from '@main-components/Form/inputs/PhoneTextInput';
import SaveButton from '@main-components/Form/SaveButton';
import Icon from '@main-components/Icon';
import Image from '@main-components/Image';
import PasswordInput from '@main-components/PasswordInput';
import Text from '@main-components/Text';
import useLogin from '@modules/auth/application/hooks/use-login';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { minLength, required } from '@modules/_shared/form/validate';
import { AppCountries } from 'config/Countries/data/AppCountries';
import { getDeviceState, initialDeviceState } from 'config/Device/store/device.slice';
import LoginInputPhoneImplementation from 'integration/modules/Login/LoginInputPhoneImplementation';
import { getLoginState } from 'integration/modules/Login/store/login.slice';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const PHONE_MIN_LENGTH = 9;

export function LoginWizardForm() {
    const [loading, setLoading] = useState(false);
    const login = useLogin();
    const theme = useTheme();
    const loginState = useSelector(getLoginState)

    return (
        <WizardForm
            onSubmit={() => { }}
            toolbar={
                <FormToolbar
                    saving={loading}
                    onLogin={async (credentials: any) => {
                        setLoading(true);
                        login({
                            phone: loginState.phoneNumber,
                            password: credentials.password
                        }).finally(() => {
                            setLoading(false);
                        });
                    }}
                />
            }
        >
            <FormStep stepKey={0}>
                
                <View style={{marginBottom : 10}}>   
                    <Box flexDirection="row" alignItems="center">
                        <Box mr="s">
                            <Image
                                source={images.SECONDARY_ARROW}
                                style={{ width: 20, height: 20 }}
                            />
                        </Box>
                        <Box>
                            <Text>Comienza con tu </Text>
                        </Box>
                    </Box>
                </View>
                <LoginInputPhoneImplementation />


                {/* <FormInput
                    ComponentInput={PhoneTextInput}
                    source="phone"
                    placeholder="Teléfono"
                    label={(props: any) => {
                        return (
                            <Box flexDirection="row" alignItems="center">
                                <Box mr="s">
                                    <Image
                                        source={images.SECONDARY_ARROW}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </Box>
                                <Box>
                                    <Text {...props}>Comienza con tu </Text>
                                </Box>
                            </Box>
                        );
                    }}
                    validate={[
                        required('Ingresa tu número de teléfono'),
                        minLength(
                            PHONE_MIN_LENGTH,
                            `Tu teléfono debe contener al menos ${PHONE_MIN_LENGTH} números`
                        )
                    ]}
                    defaultCountryCode={'CO'}
                    countryCodes={AppCountries}
                /> */}

                {/* <FormInput
                    ComponentInput={EmailTextInput}
                    source="email"
                    placeholder="Correo electrónico"
                    label={(props: any) => {
                        return (
                            <Box flexDirection="row" alignItems="center">
                                <Box mr="s">
                                    <Image
                                        source={images.SECONDARY_ARROW}
                                        style={{ width: 20, height: 20 }}
                                    />
                                </Box>
                                <Box>
                                    <Text {...props}>Comienza con tu </Text>
                                </Box>
                            </Box>
                        );
                    }}
                    
                    validate={required()}
                    //defaultCountryCode={deviceState.iso2Country || initialDeviceState.iso2Country}
                    // countryCodes={AppCountries}
                /> */}
            </FormStep>
            <FormStep stepKey={1}>
                <FormInput
                    ComponentInput={PasswordInput}
                    source="password"
                    placeholder="Introduce tu contraseña"
                    autoFocus
                    label={(props: any) => {
                        return (
                            <Box flexDirection="row" alignItems="center">
                                <Box mr="s">
                                    <AppIcon
                                        name="lock"
                                        size={25}
                                        color={theme.colors.primaryMain}
                                    />
                                </Box>
                                <Box>
                                    <Text {...props}>Contraseña</Text>
                                </Box>
                            </Box>
                        );
                    }}
                    validate={[required('Ingresa tu clave')]}
                />
            </FormStep>
        </WizardForm>
    );
}

function FormToolbar(props:any) {
    const { watch, errors } = useForm();
    const showToolbar = useSharedValue(0);
    const values = watch(['phone']);

    // const phone = props.values?.phone ?? values?.phone ?? '';
    const invalidPhone = errors?.phone;

    const loginState = useSelector(getLoginState)

    useEffect(() => {

        if (invalidPhone) {
            showToolbar.value = 0;
            return;
        }

        if (loginState.phoneNumber?.length < PHONE_MIN_LENGTH || !loginState.phoneNumber) {
            showToolbar.value = 0;
            return;
        }

        showToolbar.value = 1;

    }, [invalidPhone, loginState.phoneNumber]);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: withTiming(showToolbar.value, {
                duration: 300
            })
        };
    }, [errors?.phone]);

    return (
        <Animated.View style={{ ...animatedStyles }}>
            <Box
                width="100%"
                flexDirection="row"
                justifyContent={props.canGoPrev ? 'space-between' : 'flex-end'}
                alignItems="center"
            >
                {props.canGoPrev && (
                    <Button
                        uppercase={false}
                        onPress={() => {
                            props.goPrev();
                        }}
                        title="Atrás"
                        mode="text"
                        titleColor="primaryMain"
                        icon={() => (
                            <Icon
                                type="font-awesome-5"
                                name="chevron-left"
                                color="primaryMain"
                                numberSize={20}
                            />
                        )}
                    />
                )}

                {/* aqui */}
               
                { props.canGoNext &&  !props.isLastStep && (
                    <Box ml="m" width={140}>
                        <SaveButton
                            block={false}
                            label="Siguiente"
                            size="s"
                            uppercase={false}
                            onSubmit={(values:any) => {
                                props.onSubmit(values);
                                props.goNext();
                            }}
                            mode="text"
                            titleColor="primaryMain"
                            title="Siguiente 22"
                            icon={() => (
                                <Icon
                                    type="font-awesome-5"
                                    name="chevron-right"
                                    color="primaryMain"
                                    numberSize={20}
                                />
                            )}
                        />
                    </Box>
                )}
                
                {props.isLastStep && (
                    <Box ml="m" width={140}>
                        <SaveButton
                            block={false}
                            size="s"
                            loading={props.saving}
                            uppercase={false}
                            onSubmit={(values:any) => {
                                const newValues = {
                                    ...props.values,
                                    ...values
                                };

                                props.onLogin(newValues);
                            }}
                            mode="text"
                            titleColor="primaryMain"
                            label="Siguiente"
                            title="Siguiente"
                            icon={() => (
                                <Icon
                                    type="font-awesome-5"
                                    name="chevron-right"
                                    color="primaryMain"
                                    numberSize={20}
                                />
                            )}
                        />
                    </Box>
                )}
            </Box>
        </Animated.View>
    );
}
