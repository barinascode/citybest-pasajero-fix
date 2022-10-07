import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Image from '@main-components/Image';
import Modal from '@main-components/Modal';
import Rating from '@main-components/Rating';
import Text from '@main-components/Text';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import useFavoriteLastDestination from '@modules/trip/application/hooks/use-favorite-last-destination';
import useRateTrip from '@modules/trip/application/hooks/use-rate-trip';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import React, { useState } from 'react';
import { SaveFavoriteDestinationNotificationCardController } from '../SaveFavoriteDestinationNotificationCard';
import TripNotificationCard from '../TripNotificationCard';

interface RateDriverNotificationCardProps {
    onRate: (rate: number) => Promise<void>;
    rating: boolean;
    driver: {
        profilePictureUrl?: string;
    };
}

export default function RateDriverNotificationCard(
    props: RateDriverNotificationCardProps
) {
    const theme = useTheme();

    const [rate, setRate] = useState(5);

    return (
        <>
            <TripNotificationCard>
                <Box height={265} justifyContent="center" alignItems="center">
                    <Box mb="m" mt="m">
                        <Text variant="heading2" color="white">
                            Califica a tu conductor
                        </Text>
                    </Box>

                    <Box>
                        <DriverProfilePicture
                            profilePictureUrl={props.driver.profilePictureUrl}
                        />
                    </Box>

                    <Box mt="m">
                        <Rating
                            selectedColor="successMain"
                            unSelectedColor="white"
                            count={rate}
                            isDisabled={false}
                            iconSize={30}
                            onFinish={(value) => {
                                setRate(value);
                            }}
                        />
                    </Box>

                    <Box mt="xl">
                        <Button
                            onPress={async () => {
                                await props.onRate(rate);
                            }}
                            rounded={false}
                            title="Enviar"
                            backgroundColor="successMain"
                            disabled={props.rating}
                            loading={props.rating}
                        />
                    </Box>
                </Box>
            </TripNotificationCard>
        </>
    );
}

function DriverProfilePicture({
    profilePictureUrl
}: {
    profilePictureUrl?: string;
}) {
    const theme = useTheme();
    const SIZE = 70;
    return (
        <Box
            style={{
                width: SIZE - 2,
                height: SIZE - 2,
                borderRadius: 50
            }}
        >
            <Image
                source={
                    profilePictureUrl
                        ? { uri: profilePictureUrl }
                        : images.DEFAULT_PHOTO
                }
                resizeMode={'cover'}
                style={{
                    borderWidth: 1,
                    borderRadius: (SIZE - 2) / 2,
                    borderColor: theme.colors.primaryMain,
                    width: SIZE - 2,
                    height: SIZE - 2,
                    resizeMode: 'cover'
                }}
            />
        </Box>
    );
}

export function RateDriverNotificationCardController() {
    const { trip } = useGetActiveTrip();
    const { rate, loading: rating } = useRateTrip();
    const [showSaveAsFavorite, setShowSaveAsFavorite] = useState(false);
    const {
        save: saveLastDestinationAsFavorite,
        loading: savingLastDestinationAsFavorite
    } = useFavoriteLastDestination();

    const active =
        !!trip &&
        trip.status === 'FINISHED' &&
        trip.isCharged &&
        trip.isPaid &&
        !trip.isRated;

    return (
        <>
            <Modal
                visible={active}
                contentContainerStyle={{
                    backgroundColor: 'transparent'
                }}
            >
                {trip ? (
                    <RateDriverNotificationCard
                        driver={trip.acceptedDriver}
                        rating={rating}
                        onRate={async (newRate) => {
                            await rate(trip.id, newRate);
                            setShowSaveAsFavorite(true);
                        }}
                    />
                ) : null}
            </Modal>
            <SaveFavoriteDestinationNotificationCardController
                show={showSaveAsFavorite}
                onDismiss={() => {
                    setShowSaveAsFavorite(false);
                }}
                onAccept={async () => {
                    await saveLastDestinationAsFavorite();
                    setShowSaveAsFavorite(false);
                }}
                accepting={savingLastDestinationAsFavorite}
            />
        </>
    );
}
