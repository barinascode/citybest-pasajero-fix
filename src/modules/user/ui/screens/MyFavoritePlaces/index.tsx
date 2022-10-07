import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Skeleton from '@main-components/Skeleton';
import StatusBar from '@main-components/StatusBar';
import Text from '@main-components/Text';
import useGetFavoriteDestinations from '@modules/trip/application/hooks/use-get-favorite-destinations';
import { TripDestination } from '@modules/trip/domain/models/trip-destination';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import BackButton from '../../components/BackButton';

export default function MyFavoritePlaces(props) {
    const theme = useTheme();

    const { data, loading } = useGetFavoriteDestinations();
    const { navigate } = useNavigation();

    const favoritePlaces = data ?? [];

    return (
        <Box style={{ backgroundColor: theme.colors.white, flex: 1 }}>
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
                        mb="m"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Box mr="s">
                            <Image
                                source={images.SECONDARY_ARROW}
                                style={{
                                    resizeMode: 'contain',
                                    width: 20,
                                    height: 20
                                }}
                            />
                        </Box>

                        <Box>
                            <Text variant="heading1" align="center">
                                Destinos favoritos
                            </Text>
                        </Box>
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
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <>
                            {favoritePlaces.length > 0 ? (
                                [...favoritePlaces].map((dest, index) => (
                                    <FavoritePlaceCard
                                        key={index}
                                        loading={false}
                                        fDestination={dest}
                                    />
                                ))
                            ) : (
                                <Box>
                                    <Text align="center">
                                        No has agregado destinos aún!
                                    </Text>
                                </Box>
                            )}
                        </>
                    )}
                </Box>
            </ScrollView>
        </Box>
    );
}

function LoadingSkeleton() {
    return (
        <>
            {[{}, {}, {}].map((card, index) => (
                <FavoritePlaceCard key={index} loading={true} />
            ))}
        </>
    );
}

function FavoritePlaceCard({
    loading,
    fDestination
}: {
    loading: boolean;
    fDestination?: TripDestination;
}) {
    const { date } = useUtils();
    const theme = useTheme();

    if (loading || !fDestination) {
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
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                height={'100%'}
            >
                <Box flex={0.3} alignItems="center" justifyContent="center">
                    <AppIcon
                        name="favorite"
                        color={theme.colors.primaryMain}
                        size={20}
                    />
                </Box>

                <Box flex={1} justifyContent="center">
                    <Text variant="heading3" numberOfLines={2}>
                        {fDestination.place.address}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}
