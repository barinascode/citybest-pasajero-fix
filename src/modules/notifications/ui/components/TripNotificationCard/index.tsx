import Box from '@main-components/Box';
import React from 'react';

export default function TripNotificationCard({
    children,
    style
}: {
    children: any;
    style?: any;
}) {
    return (
        <Box borderRadius={20} padding="m" bg="primaryMain" style={style}>
            {children}
        </Box>
    );
}
