
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Marker } from 'react-native-maps';
import { Text } from 'react-native-paper';
import { TouchableOpacity, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { searchPlaces } from 'Hooks/useSearchPlaces';
let customFonts = {
    'ptsans': require('@assets/fonts/PTSans-Regular.ttf'),
};
import { useFonts } from 'expo-font';


interface DestinationMarkerProps {
    position: GeoPoint;
    renderCallout?: any;
    address?: string;
}

export function DestinationMaker(props: DestinationMarkerProps, ref: any) {


    const [loading, setloading] = useState(true)
    const [destinationAddress, setdestinationAddress] = useState<string>('');
    const [fontsLoaded] = useFonts({
        'ptsans': require('@assets/fonts/PTSans-Regular.ttf')
      });

      

    useMemo(() => {
        if (props.address) {
            searchPlaces(props?.position?.latitude, props?.position?.longitude).then((res) => {
                let ressplit = res.split(',');
                let final = `${ressplit[0]} - ${ressplit[1]?ressplit[1]??'':ressplit[2]??''}`
                setdestinationAddress(final??res);
            })
        }
    }, [props.address]);


    // useEffect(() => {
    //     async function _loadFontsAsync() {
    //         await Font.loadAsync(customFonts);
    //         setloading(false)
    //     }
    //     _loadFontsAsync();
    // }, []);


    const styl = StyleSheet.create({
        customMarker: {
            display: 'flex',
            justifyContent: 'space-evenly',
            overflow: 'hidden',
        },
        addressBox: {
            width: '100%',
            backgroundColor: '#fff',
            paddingVertical: 0,
            paddingHorizontal: 0,
            borderBottomLeftRadius: 1,
            borderBottomWidth: 2,
            borderBottomRightRadius: 8,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            borderWidth: 1,
            padding: 20,
            overflow: 'hidden',
            resizeMode: 'contain',
            flexDirection: 'row',
            borderColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        addressText: {
            color: 'black',
            fontSize: 16,
            fontFamily: 'ptsans',
            margin: 6,
            flex: 1, flexWrap: 'wrap'

        },
        addressText2: {
            color: '#441A7A',
            fontSize: 16,
            fontFamily: 'ptsans',
            margin: 4,
            fontWeight: 'bold',
            //backgroundColor: '#441A7A',

        }
    });
    if (loading) {
        return <AppLoading />;
    }

    if (!fontsLoaded) {
        return null;
      }
      
    return (
        <>
            {props.renderCallout && (
                <Marker
                    coordinate={{
                        latitude: props.position.latitude,
                        longitude: props.position.longitude,
                    }} style={styl.customMarker}>
                    <View style={styl.addressBox}>

                        <TouchableOpacity onPress={() => console.log('Click!')}>
                            <Text numberOfLines={1} style={styl.addressText}>
                                {destinationAddress}
                            </Text>
                            
                        </TouchableOpacity>

                    </View>


                </Marker>

            )}</>
    );
}

export default React.forwardRef(DestinationMaker);
