import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import theme from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import LocationUtils from '@modules/_shared/domain/utils/misc/location-utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { getProfileState } from 'integration/modules/Profile/store/profile.slice';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text as Text2 } from 'react-native';

import * as Location from 'expo-location';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import LocationAddress from '@modules/_shared/domain/models/location-address';

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



const getCurrentPosition = async ():Promise<GeoPoint> => {

    const MAX_ATTEMPTS = 50;

    let { status } =
        await LocationUtils.requestForegroundPermissionsAsync();

    const lastTry: number = parseInt(
        (await AsyncStorage.getItem('GPS_LOC_TRY')) || '0'
    );

    let location = { coords: { latitude: 0, longitude: 0 } };
    try {
        /*  if (status == 'granted' && lastTry < 2) {
            throw new Error('NOT_GRANTED');
        } */

        if (status !== 'granted') {
            throw new Error('NOT_GRANTED');
        }

        location = await Location.getCurrentPositionAsync({
            accuracy: Location.LocationAccuracy.Highest
        });
    } catch (error: any) {
        if (lastTry < MAX_ATTEMPTS) {
            /*   alert('Try: ' + lastTry); */
            await AsyncStorage.setItem(
                'GPS_LOC_TRY',
                (lastTry + 1).toString()
            );
            return LocationUtils.getCurrentPosition();
        }

        await AsyncStorage.removeItem('GPS_LOC_TRY');
        throw new Error(error);
    }

    await AsyncStorage.removeItem('GPS_LOC_TRY');

    return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    };
}


const getPositionAddress = async (position: GeoPoint):Promise<LocationAddress> => {
   
    
    try {
        // let { status } = await LocationUtils.requestForegroundPermissionsAsync();

    console.log('step 1 : locationToString', position )
    let data = await Location.reverseGeocodeAsync(position);
    
    await axios.post('http://192.168.1.12:3008',{
        body: JSON.stringify({
            'service': 'step 1',
            data: position
        })
    });

    await axios.post('http://192.168.1.12:3008',{
        body: JSON.stringify({
            'service': 'step 2',
            data: data
        })
    });
    console.log('step 2 : locationToString', data )
    
    const  result = await LocationAddress.fromPrimitives({ ...data[0] });
    
    console.log('step 3 : locationToString', result )


    await axios.post('http://192.168.1.12:3008',{
        body: JSON.stringify({
            'service': 'step 3',
            data: JSON.stringify(result),
        })
    });

        return result

    } catch (error) {
        console.log(error)

        await axios.post('http://192.168.1.12:3008',{
            body: JSON.stringify({
                'service': 'error transformando coordenadas a direcciones',
                error: JSON.stringify(error),
                position: position
            })
        });

        return new LocationAddress({
            city: '',
            district: '',
            street: '',
            region: '',
            subregion: '',
            country: '',
            postalCode: '',
            name: '',
            isoCountryCode: '',
            timezone: '',
        })
    }


}

export const UserStatusBarController = React.memo(function UserStatusBarController() {
    
    const [currentPosition, setCurrentPosition] = useState<{
        latitude : number;
        longitude : number;
        street : string;
        shortAddress : string;
    }>({
        latitude : 0,
        longitude : 0,
        street : '',
        shortAddress : '',
    });

   
    const getCurrentPositionCallBack = useCallback(async ()=>{


        try {
            console.log('= = = Enviando log remoto = = =')
        await axios.post('http://192.168.1.12:3008' , {
            body: JSON.stringify({
                'hook': 'UserStatusBarController',
                message : '= = = SOLICITANDO : 1 = = =',
            })
        })

        console.log('paso 1')

        console.log('= = = Enviando log remoto = = =')
        await axios.post('http://192.168.1.12:3008' , {
            body: JSON.stringify({
                'hook': 'getCurrentPosition',
                message : '= = = SOLICITANDO : 2 = = =',
            })
        })
        console.log('paso 2')
        const resultGetCurrentPosition = await getCurrentPosition()

        
        
        console.log('= = = Enviando log remoto = = =')
        await axios.post('http://192.168.1.12:3008' , {
            body: JSON.stringify({
                'hook': 'getCurrentPosition',
                message : '= = = RESPUESTA : 3 = = =',
                response : resultGetCurrentPosition
            })
        })
        console.log('paso 3', resultGetCurrentPosition)

        
        
      

        console.log('= = = Enviando log remoto = = =')
        await axios.post('http://192.168.1.12:3008' , {
            body: JSON.stringify({
                'hook': 'getPositionAddress',
                message : '= = = SOLICITANDO : 4 = = =',
            
            })
        })
        console.log('paso 4')
      
        const  positionAddress = await getPositionAddress( resultGetCurrentPosition );


        console.log('paso 5', positionAddress)

        console.log('= = = Enviando log remoto = = =')
        await axios.post('http://192.168.1.12:3008' , {
            body: JSON.stringify({
                'hook': 'getPositionAddress',
                message : '= = = SOLICITANDO : 5 = = =',
                response : {
                        street : positionAddress.street,
                        shortAddress : positionAddress.shortAddress
                    }
            })
        })

      
        setCurrentPosition({
            latitude : resultGetCurrentPosition.latitude,
            longitude : resultGetCurrentPosition.longitude,
            street : positionAddress.street,
            shortAddress : positionAddress.shortAddress,
        })

        } catch (error) {
            console.log(error)   
        }

        

    },[setCurrentPosition])

    useEffect(() => {
        getCurrentPositionCallBack()
    },[])


    const { data: user } = useGetProfile();

    return (
        <AnimatedUserStatusBar
            driver={{
                profilePictureUrl: user?.profilePictureUrl
                    ? user?.profilePictureUrl
                    : images.DEFAULT_PHOTO
            }}
            location={{
                streetName: currentPosition.street ?? '',
                address: currentPosition?.shortAddress ?? ''
            }}
        />
    );
})
