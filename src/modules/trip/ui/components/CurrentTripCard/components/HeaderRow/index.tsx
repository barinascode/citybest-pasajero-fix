import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import React from 'react';
import { CardButton } from '../CardButton';

interface HeaderRowProps {
    finalFee: {
        amount: number;
        currency: string;
    };
    driverPhoneNumber: string;
    onShowRouteDetails: any;
}
export function HeaderRow(props: HeaderRowProps) {
    const theme = useTheme();

    const { finalFee } = props;

    const utils = useUtils();

    const openWhatsApp = () => {
        utils.linking.sendWhatsAppMessage(props.driverPhoneNumber, {});
    };

    const openSpotify = () => {
        utils.linking.openURL('https://open.spotify.com');
    };

    return (
        <Box width="100%" flexDirection="row" flexGrow={0} height={60}>
            <Box width="20%" height="100%" mr="xs">
                <CardButton
                    color="primaryMain"
                    onPress={() => {
                        openSpotify();
                    }}
                >
                    <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Box>
                            <Icon
                                name="spotify"
                                numberSize={30}
                                color="successMain"
                            />
                        </Box>

                        <Box>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold'
                            }} color="white" variant="xsmall">
                                Mi spotify
                            </Text>
                        </Box>
                    </Box>
                </CardButton>
            </Box>
            <Box width="30%" flexShrink={1} height="100%" mr="xs">
                <CardButton color="white">
                    <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Box flexDirection="row">
                            <Text color="black" bold>
                                {finalFee.currency} {finalFee.amount}
                            </Text>
                        </Box>
                        <Box>
                            <Text
                                style={{
                                    fontWeight: 'bold'
                                }}
                                numberOfLines={2}
                                color="greyMain"
                                variant="xsmall"
                            >
                                Valor
                            </Text>
                        </Box>
                    </Box>
                </CardButton>
            </Box>
            <Box width="30%" height="100%" mr="xs" >
                {/* <CardButton color="white">
                    <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Box>
                            <Image
                                source={images.STOP_POINT}
                                style={{
                                    height: 20,
                                    width: 50,
                                    resizeMode: 'contain'
                                }}
                            />
                        </Box>

                        <Box>
                            <Text
                                align="center"
                                color="greyMain"
                                variant="xsmall"
                            >
                                Agregar segunda parada
                            </Text>
                        </Box>
                    </Box>
                </CardButton> */}
                <CardButton

                    onPress={() => {
                        props.onShowRouteDetails();
                    }}
                    color="white"
                >
                    <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Box>
                            <Image
                                source={images.STOP_POINT}
                                style={{
                                    height: 20,
                                    width: 50,
                                    resizeMode: 'contain'
                                }}
                            />
                        </Box>

                        <Box>
                            <Text
                                style={{
                                    fontWeight: 'bold'
                                }}
                                align="center"
                                color="greyMain"
                                variant="xsmall"
                            >
                                Ver rutas
                            </Text>
                        </Box>
                    </Box>
                </CardButton>
            </Box>
            <Box width="20%" height="100%" mr="xs">
                <CardButton
                    color="primaryMain"
                    onPress={() => {
                        openWhatsApp();
                    }}
                >
                    <Box
                        height="100%"
                        alignItems="center"
                        justifyContent="space-evenly"
                    >
                        <Box>
                            <AppIcon
                                name="whatsapp"
                                size={30}
                                color={theme.colors.successMain}
                            />
                        </Box>

                        <Box>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold'
                            }} color="white" variant="xsmall">
                                Mi whatsapp
                            </Text>
                        </Box>
                    </Box>
                </CardButton>
            </Box>
        </Box>
    );
}
