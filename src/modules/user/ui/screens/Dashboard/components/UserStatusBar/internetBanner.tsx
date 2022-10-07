import { AntDesign } from '@expo/vector-icons';
import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import useGetCurrentPositionAddress from '@modules/user/application/hooks/use-get-current-position-address';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import theme from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

interface UserProfile {
    name?: string;
    profilePictureUrl: string;
}

interface UserLocation {
    streetName: string;
    address: string;
}

export interface UserStatusBarProps {
    driver: UserProfile;
    location: UserLocation;
}

export default function InternetConectionVerify() {
    const dimensions = useDimensions();
    const [isOffline, setOfflineStatus] = useState(false);
    const [messageInternet, setmessageInternet] = useState({
        message: "",
        color: ""
    })
    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
            // console.log("🚀 ~ file: internetBanner.tsx ~ line 44 ~ removeNetInfoSubscription ~ state", state)
            const offline = !(state.isConnected && state.isInternetReachable);
            let { strength } = state?.details;

            if (state !== null) {
                if (strength === undefined || strength === null || strength < 60) {
                    setOfflineStatus(true);
                    setmessageInternet({
                        color: 'orange',
                        message: 'No tienes buena conexión a internet'
                    })
                } else if (!offline && strength >= 60) {
                    setOfflineStatus(false);
                }
            }

            if (offline) {
                setOfflineStatus(true);
                setmessageInternet({
                    color: 'red',
                    message: `No tienes conexión a internet `
                })
            } else {
                setOfflineStatus(false);
            }
        });
        console.log("🚀 ~ file: internetBanner.tsx ~ line 69 ~ removeNetInfoSubscription ~ NetInfo", NetInfo)

        return () => {
            removeNetInfoSubscription();
            setOfflineStatus(false);
            setmessageInternet({
                color: '',
                message: ''
            })
        }
    }, [NetInfo.useNetInfo]);


   

    return (
        <Box
            flexDirection="row"
            alignItems="center"
            style={{
                position: 'absolute',
                zIndex: 9999,
                top: 200,
            }}
        >
            {isOffline && (
                <Box
                    width={dimensions.width - 20 - 35}
                    borderRadius={6}
                    bg="primaryMain"
                    flexDirection="row"
                    borderWidth={2}
                    borderColor="greyLight"
                    position="absolute"
                    alignItems="center"
                    height={40}
                    paddingHorizontal="s"
                    style={{
                        marginLeft: 35,
                        paddingLeft: 35,
                        backgroundColor: messageInternet.color
                    }}
                >
                    <Box
                        flex={1}
                        flexDirection="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        padding="s"
                    >
                        <Box mr="s">
                            <AntDesign name="earth" size={22} color="white" />
                        </Box>
                        <Box justifyContent="flex-start">
                            <Box marginVertical="xs">
                                <Text variant="body" color='white'>
                                    {messageInternet.message}
                                </Text>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export function UserInternetConection() {

    return <InternetConectionVerify />;
}
