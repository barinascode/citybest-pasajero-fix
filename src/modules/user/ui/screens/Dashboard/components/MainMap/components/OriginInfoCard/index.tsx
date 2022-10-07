import Box from '@main-components/Box';
import Text from '@main-components/Text';
import React from 'react';

export function OriginInfoCard({ origin, address }) {
    return (
        <Box
            zIndex={99999999999999999999}
            bg="white"
            flexDirection="row"
            height={50}
            width={180}
            style={{
                position: 'absolute',
                top: 20,
                justifyContent: 'center',
                alignItems: 'center',
                
            }}
        >
            <Box
                justifyContent="center"
                alignItems="center"
                bg="white"
                zIndex={99999999999999999999}
                flex={1}
                width={180}
                padding="s"
            >
                <Text numberOfLines={2} color="black" variant="body">
                    hola
                </Text>
            </Box>
        </Box>
    );
}
