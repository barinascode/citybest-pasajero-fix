import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Image from '@main-components/Image';
import Skeleton from '@main-components/Skeleton';
import StatusBar from '@main-components/StatusBar';
import Text from '@main-components/Text';
import useDeleteCard from '@modules/user/application/hooks/use-delete-card';
import useGetCards from '@modules/user/application/hooks/use-get-cards';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';

export default function PaymentMethods() {
    const theme = useTheme();

    const { data, loading } = useGetCards();
    const { navigate } = useNavigation();

    return (
        <Box style={{ backgroundColor: theme.colors.white, flex: 1 }}>
            <Box flex={1}>
                <StatusBar />
                <ScrollView
                    keyboardShouldPersistTaps="always"
                    style={{
                        margin: 5
                    }}
                >
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
                                Mis tarjetas
                            </Text>
                        </Box>
                        <Box
                            style={{
                                position: 'absolute',
                                top: -15,
                                right: 10
                            }}
                        >
                            <Image
                                source={images.ISO_LOGO}
                                style={{
                                    resizeMode: 'contain',
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </Box>

                        {loading ? (
                            <LoadingSkeleton />
                        ) : (
                            <>
                                {data.length > 0 ? (
                                    [...data].map((card, index) => (
                                        <Card
                                            key={index}
                                            loading={false}
                                            cardInfo={card}
                                        />
                                    ))
                                ) : (
                                    <Box>
                                        <Text align="center">
                                            No has agregado tarjetas para pagar
                                            tus viajes
                                        </Text>
                                    </Box>
                                )}
                            </>
                        )}

                        
                        <Box mt="m" marginHorizontal="xl">
                            <Button
                                title="Agregar nueva tarjeta"
                                uppercase={false}
                                onPress={() => {
                                    navigate('AddCard');
                                }}
                            />
                        </Box>
                    </Box>
                </ScrollView>
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

function LoadingSkeleton() {
    return (
        <>
            {[{}, {}, {}].map((card, index) => (
                <Card key={index} loading={true} />
            ))}
        </>
    );
}

function Card({
    loading,
    cardInfo
}: {
    loading: boolean;
    cardInfo?: {
        id: string;
        type: string;
        lastFourDigits: string;
        firstSixDigits: string;
        thumbnail: string;
        holderName: string;
        cardInfo?: any;
    };
}) {
    const { deleteCard, loading: deleting } = useDeleteCard();

    if (loading || deleting) {
        return (
            <Skeleton
                type={'rectangle'}
                loading={true}
                style={{ borderRadius: 30, height: 100, marginBottom: 20 }}
            />
        );
    }

    return (
        <Box
            backgroundColor="greyLight"
            borderRadius={30}
            height={100}
            mb="m"
            p="m"
        >
            <Box
                mb="m"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                height={35}
            >
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Text bold variant="heading2">
                        {cardInfo?.holderName}
                    </Text>
                </Box>
                <Box alignItems="flex-end" justifyContent="center">
                    <Button
                        mode="text"
                        onPress={() => {
                            Alert.alert(
                                'Eliminar tarjeta',
                                `Estás seguro que desear eliminar la tarjeta: ${cardInfo?.type.toUpperCase()} finalizada en ${
                                    cardInfo?.lastFourDigits
                                }`,
                                [
                                    { text: 'Cancelar' },
                                    {
                                        text: 'Eliminar',
                                        onPress: () => {
                                            if (!cardInfo) return;

                                            deleteCard({ cardId: cardInfo.id });
                                        }
                                    }
                                ]
                            );
                        }}
                        title="Eliminar"
                        titleColor="dangerMain"
                        uppercase={false}
                        labelStyle={{ fontSize: 15 }}
                    />
                </Box>
            </Box>
            <Box
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Text bold>xxxx xxxx xxxx {cardInfo?.lastFourDigits}</Text>
                </Box>
                <Box flex={0.5} justifyContent="center">
                    <Box alignItems="center" justifyContent="center">
                        <Image
                            source={{ uri: cardInfo?.thumbnail }}
                            style={{
                                resizeMode: 'contain',
                                height: 15,
                                width: 40
                            }}
                        />

                        {/*  <Text color="black" bold>
                            {cardInfo?.type.toUpperCase()}
                        </Text> */}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
