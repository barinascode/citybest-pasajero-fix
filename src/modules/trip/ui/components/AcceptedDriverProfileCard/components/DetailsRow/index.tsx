import Box from '@main-components/Box';
import Rating from '@main-components/Rating';
import Text from '@main-components/Text';
import React from 'react';

interface DetailsRowProps {
    rating: number;
    carInfo?: {
        carBrand: string;
        cardBrand: string;
        carModel: string;
        carYear: number;
        patent: string;
    };
}

export function DetailsRow(props: DetailsRowProps) {
    return (
        <Box
            marginTop="s"
            borderTopWidth={1}
            borderTopColor="greyMain"
            borderBottomWidth={1}
            borderBottomColor="greyMain"
            height={70}
            flexDirection="row"
            flexWrap="nowrap"
        >
            <Box
                flex={0.3}
                height="100%"
                mr="s"
                justifyContent="space-evenly"
                alignItems="center"
                borderRightColor="greyMain"
                borderRightWidth={1}
                paddingHorizontal="s"
            >
                <Text align="center" color="greyMain" variant="body1">
                    Calificación
                </Text>
                <Box width="100%">
                    <Rating count={props.rating} isDisabled={true} />
                </Box>
            </Box>

            <Box
                flex={0.4}
                height="100%"
                justifyContent="space-evenly"
                alignItems="center"
                borderRightColor="greyMain"
                borderRightWidth={1}
                paddingHorizontal="s"
            >
                <Text align="center" color="greyMain" variant="body1">
                    Modelo vehículo
                </Text>
                <Box width="100%">
                    <Text align="center" uppercase color="black2" >
                        {props?.carInfo?.carBrand || props?.carInfo?.cardBrand ||  'Desconocido'}{' '}
                    </Text>
                    <Text align="center" uppercase color="black2" >
                        {props?.carInfo?.carModel}
                    </Text>
                </Box>
            </Box>

            <Box
                flex={0.3}
                height="100%"
                justifyContent="space-evenly"
                alignItems="center"
                borderRightColor="greyMain"
                paddingHorizontal="s"
            >
                <Text align="center" color="greyMain" variant="body1">
                    Matrícula
                </Text>

                <Box>
                    <Text uppercase color="black2">
                        {props?.carInfo?.patent ?? 'Desconocido'}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}
