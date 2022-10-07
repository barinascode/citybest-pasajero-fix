import Box from '@main-components/Box';
import Text from '@main-components/Text';
import React from 'react';

export default function OptionLabel({ title }) {
    return (
        <Box
            height={30}
            bg="primaryMain"
            justifyContent="center"
            alignItems="center"
            borderRadius={6}
        >
            <Text color="white">{title}</Text>
        </Box>
    );
}
