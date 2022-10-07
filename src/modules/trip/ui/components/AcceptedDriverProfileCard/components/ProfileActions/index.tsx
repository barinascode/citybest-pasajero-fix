import Box from '@main-components/Box';
import Button from '@main-components/Button';
import React from 'react';

interface ProfileActionsProps {
    onClose: any;
}
export function ProfileActions(props: ProfileActionsProps) {
    return (
        <Box paddingVertical="m" alignItems="center">
            <Button
                style={{ paddingHorizontal: 20 }}
                rounded={true}
                onPress={() => {
                    props.onClose();
                }}
                backgroundColor="primaryMain"
                title="Cerrar"
                uppercase={false}
            />
        </Box>
    );
}
