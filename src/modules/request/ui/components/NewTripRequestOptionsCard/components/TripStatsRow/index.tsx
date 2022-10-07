import Box from '@main-components/Box';
import Text from '@main-components/Text';
import images from '@modules/_shared/domain/utils/constants/images';
import { getDeviceState } from 'config/Device/store/device.slice';
import { UseFlagCoutry } from 'Hooks/useFlagCountry';
import Flags from 'integration/ui/Flags';
import React, { useEffect, useState } from 'react';
import { Image, View, Text as Text2 } from 'react-native';
import { useSelector } from 'react-redux';
import CardButton from '../CardButton';

interface TripStatsRowProps {
    fee?: {
        amount: number;
        currency: string;
    };
    tripDistance: string;
}

export default function TripStatsRow(props: TripStatsRowProps) {
    const [FLAGRENDER, setFLAGRENDER] = useState(images.FLAGCOLOMBIA)
    const deviceState = useSelector(getDeviceState)
    useEffect(() => {
        let renderFlag = UseFlagCoutry(deviceState.iso2Country);
        console.log("renderflag", renderFlag)
        setFLAGRENDER(renderFlag)
    }, [deviceState])

    return (
        <Box height={60} flexDirection="row">
            <Box flex={0.6} mr="s">
                <CardButton color="white">
                    <Box justifyContent="center" alignItems="center">
                        <Box
                            height={35}
                            alignItems="center"
                            width="100%"
                            justifyContent="center"
                            flexDirection="row"
                        >
                            <Box>
                                <Flags iso2={deviceState.iso2Country} width={30} height={30} />
                            </Box>

                            <Box ml="s">
                                <Text variant="heading3" color="black" bold>
                                    {props.fee?.currency} {props.fee?.amount} 
                                </Text>
                                
                            </Box>
                        </Box>

                        <View
                        style={{}}
                        >
                            <Text2 style={{color : 'grey', fontSize : 12}}>Valor</Text2>
                            
                        </View>
                    </Box>
                </CardButton>
            </Box>
            <Box flex={0.4}>
                <CardButton color="white">
                    <Box justifyContent="center" alignItems="center">
                        <Box
                            height={35}
                            alignItems="center"
                            width="100%"
                            justifyContent="center"
                            flexDirection="row"
                        >
                            <Box width={35}>
                                <Image
                                    source={images.DISTANCE_STAT}
                                    style={{
                                        width: 35,
                                        height: 35,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Box>

                            <Box ml="s">
                                <Text variant="body1" color="black" bold>
                                    {props.tripDistance}
                                </Text>
                            </Box>
                        </Box>

                        <View
                        style={{}}
                        >
                            <Text2 style={{color : 'grey', fontSize : 12}}>Distancia</Text2>
                        </View>
                    </Box>
                </CardButton>
            </Box>
        </Box>
    );
}
