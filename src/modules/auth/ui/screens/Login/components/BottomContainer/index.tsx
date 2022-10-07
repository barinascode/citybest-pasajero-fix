import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Text from '@main-components/Text';
import useAppleLogin from '@modules/auth/application/hooks/use-apple-login';
import useFacebookLogin from '@modules/auth/application/hooks/use-facebook-login';
import useGoogleLogin from '@modules/auth/application/hooks/use-google-login';
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { registerActions } from 'integration/modules/Register/store/register.slice';
import React, { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import { useDispatch } from 'react-redux';

export default function BottomContainer({ setShowForgotModal }) {
    const [loginWithAppleAvailable, setLoginWithAppleAvailable] =
        useState(false);
    const { login: loginWithGoogle, loading: googleLoading } = useGoogleLogin();
    const { login: loginWithFacebook, loading: facebookLoading } =
        useFacebookLogin();
    const { navigate } = useNavigation();

    const { login: loginWithApple, loading: appleLoading } = useAppleLogin();

    useEffect(() => {
        (async () => {
            const loginAvailable = await AppleAuthentication.isAvailableAsync();
            setLoginWithAppleAvailable(loginAvailable);
        })();
    }, []);

    const showSocialLogin = true; //Platform.OS === 'android';
    const dispatch = useDispatch()
    
    return (
        <Box>
            {showSocialLogin && (
                <>
                    <Box justifyContent="center" alignItems="center" mb="m">
                        <Text>ó</Text>
                    </Box>
                    <Box mb="l">
                        {/* <Box mb="s">
                            <Button
                                uppercase={false}
                                title="Continuar con Facebook"
                                backgroundColor="facebookBlue"
                                loading={facebookLoading}
                                onPress={() => {
                                    Alert.alert(
                                        "Estamos trabajando",
                                        "Función habilitada próximamente.",
                                        [
                                          { text: "OK", onPress: () => console.log("OK Pressed") }
                                        ]
                                      );
                                  
                                
                                    // loginWithFacebook();
                                }}
                                icon={() => (
                                    <Image
                                        source={images.FACEBOOK_ICON}
                                        resizeMode="contain"
                                        style={{ width: 30, height: 20 }}
                                    />
                                )}
                                labelStyle={{ width: 200 }}
                            ></Button>
                        </Box> */}
                        <Box mb="s">
                            <Button
                                uppercase={false}
                                title="Continuar con Google"
                                loading={googleLoading}
                                onPress={() => {

                                    Alert.alert(
                                        "Estamos trabajando",
                                        "Función habilitada próximamente.",
                                        [
                                          { text: "OK", onPress: () => console.log("OK Pressed") }
                                        ]
                                      );
                                  
                                      
                                    // loginWithGoogle();
                                }}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#eae9e9'
                                }}
                                backgroundColor="googleButton"
                                titleColor="black"
                                icon={() => (
                                    <Image
                                        source={images.GOOGLE_ICON}
                                        resizeMode="contain"
                                        style={{ width: 30, height: 20 }}
                                    />
                                )}
                                labelStyle={{ width: 200 }}
                            ></Button>
                        </Box>
                        {loginWithAppleAvailable && (
                            <Box mb="s">
                                <AppleAuthentication.AppleAuthenticationButton
                                    buttonType={
                                        AppleAuthentication
                                            .AppleAuthenticationButtonType
                                            .SIGN_IN
                                    }
                                    buttonStyle={
                                        AppleAuthentication
                                            .AppleAuthenticationButtonStyle
                                            .BLACK
                                    }
                                    cornerRadius={20}
                                    style={{ width: '100%', height: 50 }}
                                    onPress={async () => {
                                        loginWithApple();
                                    }}
                                />
                            </Box>
                        )}
                    </Box>
                </>
            )}

            <Box mb="s">
                <Button
                    mode="text"
                    titleColor="black"
                    uppercase={false}
                    title="¿Aún no tienes una cuenta?"
                    disabled
                    onPress={() => {}}
                ></Button>
            </Box>
            <Box mb="s">
                <Button
                    uppercase={false}
                    title="Regístrate"
                    onPress={() => {
                        dispatch(registerActions.setDefaultState())
                        navigate('Register', { noCache: new Date().toDateString() });
                    }}
                ></Button>
            </Box>
            <Box mb="s">
                <Button
                    uppercase={false}
                    title="Recuperar contraseña"
                    onPress={() => {
                        setShowForgotModal(true);
                    }}
                    mode="outlined"
                    titleColor="primaryMain"
                ></Button>
            </Box>
        </Box>
    );
}
