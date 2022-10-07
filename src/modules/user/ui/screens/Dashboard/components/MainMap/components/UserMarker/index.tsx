import Box from '@main-components/Box';
import { Marker } from 'react-native-maps';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'react-native-elements';
import { Text } from 'react-native-paper';
import * as Font from 'expo-font';
import images from '@modules/_shared/domain/utils/constants/images';
import { searchPlaces } from 'Hooks/useSearchPlaces';
import { calculateHeading } from 'integration/modules/Map/GoogleMap/tools/calculateHeading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpolateCoordinate } from 'integration/shared/tools/iterpolateCoordinates';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import { useSelector } from 'react-redux';
import { getProfileState } from 'integration/modules/Profile/store/profile.slice';
import { enviroment } from 'config/Travel';

let customFonts = {
    'ptsans': require('../../../../../../../../../assets/fonts/PTSans-Regular.ttf'),
};


interface UserMarkerProps {
    position: GeoPoint;
    pictureUrl: string;
    renderCallout?: any;
    auto?: boolean;
    address?: string;
    duration?: any;
    destinationUser?: any;
    user?: any;
    ref?: any;
}

export function UserMaker(props: UserMarkerProps, ref: any) {
    let MARKER_SIZE = 50;
    let BORDER_WIDTH = 2;

    const [originAddress, setoriginAddress] = useState('');
    const [markerWayPoints, setMarketWayPoints] = useState<any>([]);

    useMemo(() => {
        if (props.address) {
            searchPlaces(
                props?.position?.latitude,
                props?.position?.longitude
            ).then((res) => {
                let ressplit = res.split(',');
                //console.log("res", res)
                let final = `${ressplit[0]} - ${ressplit[1]}`;
                setoriginAddress(final ?? res);
            });
        }
    }, [props.address]);

    const _retrieveWayPoints = async () => {
        try {
            const value = await AsyncStorage.getItem('@wayPoints');
            if (value !== null) {
                // We have data!!

                const ways = JSON.parse(value) || [];
                const interpolatedWaypoints = interpolateCoordinate(2, ways);
                setMarketWayPoints(interpolatedWaypoints);
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    useEffect(() => {
        _retrieveWayPoints();
    }, [props]);

    const { data: user, loading } = useGetProfile();
    const profileState = useSelector(getProfileState);
    const [userData, setuserData] = useState({
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        profilePictureUrl: user?.profilePictureUrl ?? ''
    });
    const [visiblePopover, setvisiblePopover] = useState(false);

    useEffect(() => {
        if (profileState.firstName !== '') {
            setuserData({
                firstName: profileState?.firstName ?? '',
                lastName: profileState?.lastName ?? '',
                email: profileState?.email ?? '',
                profilePictureUrl: profileState?.profilePictureUrl ?? ''
            });
        } else {
            setuserData({
                firstName: user?.firstName ?? '',
                lastName: user?.lastName ?? '',
                email: user?.email ?? '',
                profilePictureUrl: user?.profilePictureUrl ?? ''
            });
        }
    }, [profileState, user]);

    return (
        <>
            {props.renderCallout ? (
                <>
                    <Marker.Animated
                        coordinate={markerWayPoints[0] || props.position}
                        rotation={(markerWayPoints[0]) ? calculateHeading(markerWayPoints[0], markerWayPoints[1]) : 0}
                    >
                        <Image
                                fadeDuration={0}
                                defaultSource={images.PIXEL}
                                source={
                                    (enviroment == 'DEVELOPMENT')
                                    ? 
                                    images.TRAVEL_PRE_ORDER 
                                    : 
                                    images.AUTOMOVING_PRODUCTION
                                }
                                style={{ width: 50, height: 50 }}
                                resizeMode="contain"
                            />
                        
                    </Marker.Animated>


                    <Marker tracksInfoWindowChanges tracksViewChanges coordinate={props.position}
                        anchor={{ x: 0.5, y: 2 }}
                        centerOffset={{
                            x: -MARKER_SIZE / 2,
                            y: -MARKER_SIZE / 2
                        }}
                    >
                        <View style={styl.addressBox}>
                            <View
                                style={{
                                    backgroundColor: '#441A7A'
                                }}
                            >
                                <Text
                                    numberOfLines={2}
                                    style={styl.addressText2}
                                >
                                    {props?.destinationUser?.duration?.value |
                                        0}{' '}
                                    MIN
                                </Text>
                            </View>
                            
                            <Text numberOfLines={2} style={styl.addressText}>
                                {originAddress}
                            </Text>
                        </View>
                    </Marker>
                </>
            ) : (
                <Marker
                    ref={ref}
                    onPress={() => {
                        setvisiblePopover(!visiblePopover);
                    }}
                    coordinate={props.position}
                >
                    {visiblePopover && (
                        <Box style={styl.poppover}>
                            <Text>{`${userData?.firstName} ${userData?.lastName}`}</Text>
                        </Box>
                    )}

                    <Box
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            {userData?.profilePictureUrl ? (
                                <Image
                                    source={{
                                        uri: userData?.profilePictureUrl
                                    }}
                                    style={{
                                        width: MARKER_SIZE - BORDER_WIDTH * 2,
                                        height: MARKER_SIZE - BORDER_WIDTH * 2,
                                        borderBottomRightRadius: 12,
                                        borderTopLeftRadius: 12,
                                        borderTopRightRadius: 12,
                                        borderWidth: 2,
                                        borderColor: '#fff'
                                    }}
                                />
                            ) : (
                                <Image
                                    resizeMode="contain"
                                    source={images.DEFAULT_PHOTO}
                                    style={{
                                        width: MARKER_SIZE - BORDER_WIDTH * 2,
                                        height: MARKER_SIZE - BORDER_WIDTH * 2,
                                        borderRadius:
                                            MARKER_SIZE / 2 - BORDER_WIDTH * 2
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Marker>
            )}
        </>
    );
}

export default React.forwardRef(UserMaker);

const styl = StyleSheet.create({
    customMarker: {
        display: 'flex',
        justifyContent: 'space-evenly',
        overflow: 'hidden'
    },
    addressBox: {
        width: '100%',
        backgroundColor: '#fff',
        paddingVertical: 0,
        paddingHorizontal: 0,
        borderBottomWidth: 2,
        borderBottomStartRadius: 1,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderWidth: 1,
        padding: 20,
        overflow: 'hidden',
        resizeMode: 'contain',
        flexDirection: 'row',
        borderColor: '#fff'
    },
    addressText: {
        color: 'black',
        fontSize: 14,
        fontFamily: 'ptsans',
        margin: 6,
        lineHeight: 20
    },
    addressText2: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'ptsans',
        margin: 4,
        backgroundColor: '#441A7A'
    },
    poppover: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#441A7A',
        marginBottom: 2,
        // borderBottomLeftRadius: 0,
        // borderTopLeftRadius: 12,
        // borderTopRightRadius: 0
    }
});
