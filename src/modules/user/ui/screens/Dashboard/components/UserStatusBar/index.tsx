import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import useGetCurrentPositionAddress from '@modules/user/application/hooks/use-get-current-position-address';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import theme from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import { getProfileState } from 'integration/modules/Profile/store/profile.slice';
import React, { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

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

export default function UserStatusBar(props: UserStatusBarProps) {
    const dimensions = useDimensions();
    const [addressToRender, setaddressToRender] = useState("")
    useEffect(() => {
        let streetName = props.location.streetName
        streetName = streetName.substring(0, 25)
        streetName = streetName + "..."
        setaddressToRender(streetName)
    }, [props.location.streetName])

    const { data: user, loading } = useGetProfile();
    const [FinalUser, setFinalUser] = useState({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        profilePictureUrl: user?.profilePictureUrl ?? ''
    })

    const profileState = useSelector(getProfileState)
    useEffect(() => {
        if (profileState.firstName !== "") {
            setFinalUser({
                firstName: profileState?.firstName ?? '',
                lastName: profileState?.lastName ?? '',
                email: profileState?.email ?? '',
                profilePictureUrl: profileState?.profilePictureUrl ?? ''
            })
        } else {
            setFinalUser({
                firstName: user?.firstName ?? '',
                lastName: user?.lastName ?? '',
                email: user?.email ?? '',
                profilePictureUrl: user?.profilePictureUrl ?? ''
            })
        }
    }, [profileState, user])


    const clearText = (text:string)=>{
        let result = text
    
        result = result
        .replace('null,','')
        .replace('null','')
    
        result = result.substring(0,18)
    
        if(result.length >= 18)
            result = result + '...'
    
        return result
    }

    return (
        <Box flexDirection="row" alignItems="center" >
            <Box
                left={-0}
                position="relative"
                zIndex={9999}
                width={65}
                height={65}
            >
                <UserProfileImage
                    size={65}
                    imageUrl={FinalUser?.profilePictureUrl ?? user?.profilePictureUrl ?? ""}
                />
            </Box>
            <Box
                backgroundColor="white"
                width={dimensions.width - 20 - 35}
                borderRadius={6}
                bg="primaryMain"
                flexDirection="row"
                borderWidth={1}
                borderColor="greyLight"
                position="absolute"
                alignItems="center"
                height={65}
                paddingHorizontal="s"
                style={{ marginLeft: 35, paddingLeft: 35 }}
            >
                <Box
                    flex={1}
                    flexDirection="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    padding="s"
                >
                    <Box mr="s">
                        <AppIcon color="white" name="marker" size={25} />
                    </Box>
                    <Box justifyContent="flex-start">
                        <Box marginVertical="xs">
                            <Text variant="body" color="white">
                                Te encuentras en
                            </Text>
                        </Box>
                        <Box style={{ flexGrow: 1, flexDirection: 'row' }}>
                            <Text
                                // style={{ flex: 1, width: 50 }}
                                numberOfLines={1}
                                variant="heading3"
                                color="white"
                                bold
                            >
                             {clearText(addressToRender)}  
                            </Text>
                        </Box>
                        <Box marginVertical="xs">
                            <Text color="white" numberOfLines={1}>
                            {clearText(props.location.address)}

                            </Text>
                        </Box>
                    </Box>
                </Box>
                <Box
                    ml="m"
                    flex={0}
                    width={35}
                    justifyContent="center"
                    alignItems="center"
                >
                    <AppIcon
                        size={40}
                        name="logo-collapsed"
                        color={theme.colors.white}
                    />
                </Box>
            </Box>
        </Box>
    );
}

function UserProfileImage({
    imageUrl,
    size
}: {
    imageUrl: string;
    size: number;
}) {
    return (
        <Box>
            {imageUrl !== "" ? (<Image
                source={typeof imageUrl == 'string' ? { uri: imageUrl } : imageUrl}
                resizeMode="contain"
                style={{
                    resizeMode: 'contain',
                    width: size,
                    height: size,
                    borderWidth: 1,
                    borderColor: 'white',
                }}
            />) : <Image
                source={images.DEFAULT_PHOTO}
                resizeMode="contain"
                style={{
                    resizeMode: 'contain',
                    width: size,
                    height: size,
                    borderWidth: 0,
                    borderColor: 'white',
                }}
            />}
        </Box>
    );
}

export function AnimatedUserStatusBar(props: UserStatusBarProps) {
    const dimensions = useDimensions();
    const initialPosition = { x: dimensions.width * 2, y: 50 };
    const targetPosition = { x: 10, y: 50 };

    const translateX = useSharedValue(initialPosition.x);
    const translateY = useSharedValue(initialPosition.y);

    useEffect(() => {
        translateX.value = initialPosition.x;
        translateX.value = withSpring(targetPosition.x, {
            damping: 20,
            stiffness: 90
        });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            position: 'absolute',
            zIndex: 9999,
            width: dimensions.width,
            transform: [
                {
                    translateX: translateX.value
                },
                {
                    translateY: translateY.value
                }
            ]
        };
    });

    return (
        <Animated.View style={{ ...animatedStyle }}>
            <UserStatusBar {...props} />
        </Animated.View>
    );
}

export function UserStatusBarController() {
    const { data: address, loading } = useGetCurrentPositionAddress();

    const { data: user } = useGetProfile();

    if (!address || loading) return <Box />;

    return (
        <AnimatedUserStatusBar
            driver={{
                profilePictureUrl: user?.profilePictureUrl
                    ? user?.profilePictureUrl
                    : images.DEFAULT_PHOTO
            }}
            location={{
                streetName: address?.street ?? '',
                address: address?.shortAddress ?? ''
            }}
        />
    );
}
