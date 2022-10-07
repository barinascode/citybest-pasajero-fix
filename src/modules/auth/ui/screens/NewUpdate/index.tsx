import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Text from '@main-components/Text';
import images from '@shared/domain/utils/constants/images';
import React from 'react';
import { Image } from 'react-native';

export default function NewUpdate({
    title,
    onReloadPress
}: {
    title?: string;
    onReloadPress: () => any;
}) {
    return (
        <Box
            bg="primaryDark"
            flex={1}
            justifyContent="center"
            alignItems="center"
        >
            <>
                <Image
                    resizeMode="contain"
                    style={{ maxWidth: '70%', height: 80 }}
                    source={images.LOGO}
                />
                {title && (
                    <Box mb="s" mt="s">
                        <Text variant="heading3" color="white">
                            {title}
                        </Text>
                    </Box>
                )}

                <Box
                    mt="m"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        title="Reiniciar"
                        onPress={async () => {
                            await onReloadPress();
                        }}
                    />
                </Box>
            </>
        </Box>
    );
}
