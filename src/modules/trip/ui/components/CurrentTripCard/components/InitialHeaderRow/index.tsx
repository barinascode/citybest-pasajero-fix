import Box from '@main-components/Box';
import Text from '@main-components/Text';
import News from '@modules/trip/domain/models/news';
import { TripMeasurement } from '@modules/_shared/domain/models/trip-types';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CardButton } from '../CardButton';
import { DriverProfileImage } from '../DriverProfileImage';
import { HeaderBanner } from '../HeaderBanner';

interface InitialHeaderRowProps {
    showAd: boolean;
    finalFee: {
        amount: number;
        currency: string;
    };
    distance: TripMeasurement;
    duration: TripMeasurement;
    driverPictureUrl?: string;
    onDriverPicturePress: () => void;
    news?: News;
}

export function InitialHeaderRow({
    showAd,
    finalFee,
    distance,
    duration,
    driverPictureUrl,
    onDriverPicturePress,
    news
}: InitialHeaderRowProps) {
    const theme = useTheme();

    return (
        <Box width="100%" flexDirection="row" flexGrow={0} height={60}>
            <Box
                alignItems="center"
                justifyContent="center"
                height="100%"
                width={48}
                flexGrow={0}
                flexShrink={0}
                mr="xs"
            >
                <TouchableOpacity onPress={() => onDriverPicturePress()}>
                    <DriverProfileImage profilePictureUrl={driverPictureUrl} />
                    {/* <DriverProfileImage profilePictureUrl={driverPictureUrl} /> */}
                </TouchableOpacity>
            </Box>
            {!showAd ? (
                <>
                    <Box width="55%" flexShrink={1} height="100%" mr="xs">
                        <CardButton color="white">
                            <Box
                                height="100%"
                                alignItems="center"
                                justifyContent="space-evenly"
                            >
                                <Box flexDirection="row">
                                    <Text align="center" color="black" bold>
                                        {finalFee.currency} {finalFee.amount}
                                    </Text>
                                </Box>
                                <Box>
                                    <Text
                                        align="center"
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
                    {/* <Box width="25%" flexShrink={0} height="100%" mr="xs">
                        <CardButton color="white">
                            <Box
                                height="100%"
                                alignItems="center"
                                justifyContent="space-evenly"
                            >
                                <Box>
                                    <AppIcon
                                        name="plus"
                                        size={30}
                                        color={theme.colors.successMain}
                                    />
                                </Box>

                                <Box>
                                    <Text
                                        align="center"
                                        color="greyMain"
                                        variant="xsmall"
                                        numberOfLines={2}
                                    >
                                        Agregar parada
                                    </Text>
                                </Box>
                            </Box>
                        </CardButton>
                    </Box> */}
                    <Box flexShrink={0} height="100%">
                        <Box flexGrow={1} flexDirection="row">
                            <Box>
                                <CardButton color="white">
                                    <Box
                                        height="100%"
                                        alignItems="center"
                                        justifyContent="space-evenly"
                                    >
                                        <Box>
                                            <Text color="black" bold>
                                                {distance.text}
                                            </Text>
                                        </Box>

                                        <Box>
                                            <Text
                                                color="greyMain"
                                                numberOfLines={2}
                                                variant="xsmall"
                                            >
                                                Distancia
                                            </Text>
                                        </Box>
                                    </Box>
                                </CardButton>
                            </Box>
                            <Box ml="xs" >
                                <CardButton color="white" >
                                    <Box
                                        height="100%"
                                        alignItems="center"
                                        justifyContent="space-evenly"
                                    >
                                        <Box>
                                            <Text color="black" bold>
                                                {duration.text}
                                            </Text>
                                        </Box>

                                        <Box>
                                            <Text
                                                color="greyMain"
                                                variant="xsmall"
                                            >
                                                Duración
                                            </Text>
                                        </Box>
                                    </Box>
                                </CardButton>
                            </Box>
                        </Box>
                    </Box>
                </>
            ) : (
                <Box flex={1}>{news && <HeaderBanner
                     {...news} />}</Box>
            )}
        </Box>
    );
}
