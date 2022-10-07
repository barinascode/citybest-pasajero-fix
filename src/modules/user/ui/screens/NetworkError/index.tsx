import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Text from '@main-components/Text';
import { useNavigation } from '@react-navigation/core';
import useNotificationProvider from '@shared/domain/hooks/use-notification-provider';
import { useUtils } from '@shared/domain/hooks/use-utils';
import images from '@shared/domain/utils/constants/images';
import React, { useState } from 'react';
import { Image } from 'react-native';

export default function NetworkError() {
    const { network } = useUtils();

    const [validating, setValidating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { navigate } = useNavigation();
    const dispatch = useNotificationProvider((state) => state.dispatch);

    return (
        <Box
            bg="primaryMain"
            flex={1}
            justifyContent="center"
            alignItems="center"
        >
            <Image
                source={images.LOGO}
                resizeMode="contain"
                style={{ width: 150, height: 150 }}
            />
            <Box mt="s" mb="s">
                <Text color="white" variant="heading1">
                    Error de conexión
                </Text>
            </Box>
            {error && (
                <Box mt="s" mb="s">
                    <Text color="dangerMain" variant="body1">
                        {error}
                    </Text>
                </Box>
            )}

            <Box
                mt="l"
                width="100%"
                style={{ paddingHorizontal: '25%' }}
                justifyContent="center"
            >
                <Button
                    loading={validating}
                    onPress={async () => {
                        setValidating(true);
                        const isConnected = await network.isConnected();
                        setValidating(false);

                        if (isConnected) {
                            dispatch({ type: 'HIDE_NOTIFICATION' });
                            setError(null);
                        } else {
                            setError('Aún sin conexión a internet.');
                        }
                    }}
                    title="Reintentar"
                />
            </Box>
        </Box>
    );
}
