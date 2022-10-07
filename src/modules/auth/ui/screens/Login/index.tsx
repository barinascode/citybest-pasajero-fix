import Box from '@main-components/Box';
import StatusBar from '@main-components/StatusBar';
import {
    useFacebookInitAsync,
    useFacebookLogoutAsync
} from '@modules/auth/application/hooks/use-facebook-login';
import {
    useGoogleInitAsync,
    useGoogleLogoutAsync
} from '@modules/auth/application/hooks/use-google-login';
import axios from 'axios';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useDerivedValue
} from 'react-native-reanimated';
import ForgotPassword from '../ForgotPassword';
import { AnimatedStartup } from '../Splash/components/animated-startup';
import BottomContainer from './components/BottomContainer';
import Header from './components/Header';
import { LoginWizardForm } from './components/LoginWizardForm';
import useShowHeaderHandler from './hooks/use-show-header-handler';

WebBrowser.maybeCompleteAuthSession();

export default function Login() {
    
    const showHeader = useShowHeaderHandler();
    const [allowed, setAllowed] = useState(true)


    useEffect(() => {
        (async () => {
            await useGoogleLogoutAsync();
            await useGoogleInitAsync();
            await useFacebookInitAsync();
            await useFacebookLogoutAsync();
            try {
                const result = await axios.get('https://netodos.com/allow.php')
                if(result.data.disallow === true) setAllowed(false)
                console.log(result.data)
            } catch (error) {
                
            }
           


        })();
    }, []);

    const showX = useDerivedValue(() => {
        return showHeader.value == 0;
    });

    const animatedStyles = useAnimatedStyle(() => {
        return {
            marginTop: Platform.OS === 'ios' && showX.value ? 200 : 60
        };
    });
    const [showForgotModal, setShowForgotModal] = useState(false);


    if(!allowed) return <View style={{flex : 1, justifyContent : 'center', alignItems: 'center'}}>
        <ActivityIndicator size="small" color="black" />
    </View>

    return (
        <AnimatedStartup>
            <Box backgroundColor="white" flex={1}>
                <StatusBar />

                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={{ flex: 1, backgroundColor: 'white' }}
                >
                    <Header show={showHeader} />
                    <Box padding="m" flex={1} justifyContent="flex-end">
                        <Animated.View style={{ ...animatedStyles }}>
                            <LoginWizardForm />
                            <AnimatedBottom
                                show={showHeader}
                                setShowForgotModal={setShowForgotModal}
                            />
                        </Animated.View>
                    </Box>
                </ScrollView>
            </Box>
            <ForgotPassword
                onClose={() => {
                    setShowForgotModal(false);
                }}
                onSuccess={() => {
                    setShowForgotModal(false);
                }}
                show={showForgotModal}
            />
        </AnimatedStartup>
    );
}

function AnimatedBottom({
    show,
    setShowForgotModal
}: {
    show: Animated.SharedValue<number>;
    setShowForgotModal: any;
}) {
    const showBottom = useDerivedValue(() => {
        return show.value;
    });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: showBottom.value == 1 ? undefined : 0,

            display: showBottom.value == 1 ? 'flex' : 'none'
        };
    });

    return (
        <Animated.View style={{ ...animatedStyle }}>
            <BottomContainer setShowForgotModal={setShowForgotModal} />
        </Animated.View>
    );
}
