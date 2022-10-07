import Box from '@main-components/Box';
import MapMarker from '@main-components/FullScreenMap/components/MapMarker';
import Image from '@main-components/Image';
import GeoPoint from '@modules/_shared/domain/models/geo-point';
import images from '@modules/_shared/domain/utils/constants/images';
import { enviroment } from 'config/Travel';
import React, { useEffect, useMemo } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

interface NearDriverMarkerProps {
    position: GeoPoint;
}
export default function NearDriverMarker(props: NearDriverMarkerProps) {
    const MARKER_WIDTH = 30;
    const MARKER_HEIGHT = 30;

    let rotation = useSharedValue(0);
    //se tiene que determinar bien que hace este codigo y que el carro se mueva de acerudo a la posicion del usuario
   /* useMemo(() => {
        rotation.value = withRepeat(
            withTiming(Math.floor(Math.random() * 180) + 10, {
                duration: Math.floor(Math.random() * 10000) + 3000
            }),
            -1,
            true
        );
    }, [props.position]); */

    const animatedStyle = useAnimatedStyle(() => {
        return {
            zIndex: 9999,

            transform: [
                {
                    rotate: rotation.value + ' deg'
                }
            ],

            width: MARKER_WIDTH,
            height: MARKER_HEIGHT
        };
    });

    return (
        <MapMarker
            coordinates={props.position}
            style={{
                zIndex: 9999,
                width: 80,
                height: 80,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Animated.View style={{ ...animatedStyle }}>
                <Box width={50} height={50}>
                    <Image
                        source={
                            (enviroment == 'DEVELOPMENT')
                            ? 
                            images.AUTOMOVING_CONDUCTOR_CERCANO
                            :
                            images.AUTOMOVING_PRODUCTION
                        }
                        
                        style={{
                            width: 50,
                            height: 50,
                            resizeMode: 'contain'
                        }}
                    />
                </Box>
            </Animated.View>
        </MapMarker>
    );
}
