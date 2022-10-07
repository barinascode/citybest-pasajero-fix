import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text from '@main-components/Text';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import React from 'react';
import { StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';

export default function Help() {
    const theme = useTheme();

    const { linking } = useUtils();
    return (
        <Box style={{ backgroundColor: theme.colors.white, flex: 1 }}>
            <Box flex={1}>
                <StatusBar />

                <Box style={{ marginTop: 60 }} marginHorizontal="m">
                    <BackButton />
                    <Box
                        mb="l"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box mr="m">
                            <Image
                                source={images.SECONDARY_ARROW}
                                style={{
                                    resizeMode: 'contain',
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </Box>
                        <Text variant="heading1" align="center">
                            Ayuda
                        </Text>
                    </Box>
                    <Box style={{ position: 'absolute', top: -15, right: 10 }}>
                        <Image
                            source={images.ISO_LOGO}
                            style={{
                                resizeMode: 'contain',
                                width: 40,
                                height: 40
                            }}
                        />
                    </Box>

                    <Box mb="l">
                        <Text variant="body" align="center">
                            Puedes contactarnos en cualquiera de los siguientes
                            formas
                        </Text>
                    </Box>
                </Box>

                <Box style={{ marginHorizontal: '15%' }}>
                    <Box mb="xl">
                        <TouchableOpacity
                            onPress={() => {
                                linking.sendWhatsAppMessage('+573243222725', {
                                    message: 'Hola,'
                                });
                            }}
                            style={{
                                backgroundColor: '#1e9c7a',
                                borderRadius: 8,
                                width: '100%',
                                paddingLeft: 30,
                                justifyContent: 'center',
                                padding: 10
                            }}
                        >
                            <Box flexDirection="row" alignItems="center">
                                <Box mr="s">
                                    <Image
                                        source={images.ARROW3}
                                        style={{
                                            resizeMode: 'contain',
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </Box>

                                <Text color="white" bold>
                                    +57 3243222725
                                </Text>
                            </Box>
                        </TouchableOpacity>
                        <Box
                            backgroundColor="primaryMain"
                            borderRadius={25 / 2}
                            width={25}
                            height={25}
                            justifyContent="center"
                            alignItems="center"
                            position="absolute"
                            top={-10}
                            right={20}
                        >
                            <Text color="white" variant="small" bold>
                                01
                            </Text>
                        </Box>
                    </Box>

                    <Box>
                        <TouchableOpacity
                            onPress={() => {
                                linking.openURL(
                                    'mailto:soporte@citybestapp.com'
                                );
                            }}
                            style={{
                                backgroundColor: '#1e9c7a',
                                borderRadius: 8,
                                width: '100%',
                                paddingLeft: 30,
                                justifyContent: 'center',
                                padding: 10
                            }}
                        >
                            <Box flexDirection="row" alignItems="center">
                                <Box mr="s">
                                    <Image
                                        source={images.ARROW3}
                                        style={{
                                            resizeMode: 'contain',
                                            width: 20,
                                            height: 20
                                        }}
                                    />
                                </Box>

                                <Text color="white" bold>
                                    soporte@citybestapp.com
                                </Text>
                            </Box>
                        </TouchableOpacity>
                        <Box
                            backgroundColor="primaryMain"
                            borderRadius={25 / 2}
                            width={25}
                            height={25}
                            justifyContent="center"
                            alignItems="center"
                            position="absolute"
                            top={-10}
                            right={20}
                        >
                            <Text color="white" variant="small" bold>
                                02
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box>
                <Image
                    source={images.FOOTER}
                    style={{
                        resizeMode: 'cover',
                        width: '100%',
                        height: 180
                    }}
                />
            </Box>
        </Box>
    );
}
