import Box from '@main-components/Box';
import Text from '@main-components/Text';
//import Text from '@main-components/Text';
import React from 'react';

export function DestinationInfoCard({ destination, address, duration }) {
    return (
       <Text style={{
            fontSize: 16,
            width: '100%',
       }}>
           {address}
       </Text>

    );
}

{/* <Box
            zIndex={9999999999}
            bg="white"
            flexDirection="row"
            height={50}
            width={120}
        >
            <Box
                justifyContent="center"
                alignItems="center"
                bg="primaryMain"
                height="100%"
                width={60}
                flex={0}
            >
                {duration && (
                    <>
                        <Text
                            color="white"
                            variant="heading3"
                            style={{ fontSize: 14 }}
                        >
                            {duration?.value}
                        </Text>
                        <Box mt="xs">
                            <Text color="white" variant="body">
                                min
                            </Text>
                        </Box>
                    </>
                )}
            </Box>
            <Box
                justifyContent="center"
                alignItems="center"
                bg="white"
                flex={1}
                padding="s"
            >
                <Text numberOfLines={2} color="black" variant="body">
                    {address}
                </Text>
            </Box>
                </Box>*/}