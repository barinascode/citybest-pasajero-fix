import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Skeleton from '@main-components/Skeleton';
import StatusBar from '@main-components/StatusBar';
import Text from '@main-components/Text';
import useGetCompletedTrips from '@modules/trip/application/hooks/use-get-completed-trips';
import { CompletedTrip } from '@modules/trip/domain/models/completed-trip';
import { useUtils } from '@modules/_shared/domain/hooks/use-utils';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native';
import BackButton from '../../components/BackButton';

export default function MyTrips(props) {
    const theme = useTheme();

    const { data, loading } = useGetCompletedTrips();
    const { navigate, goBack } = useNavigation();

    const completedTrips = data ?? [];
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
                            Mis viajes
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
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <>
                            {completedTrips.length > 0 ? (
                                [...completedTrips].map((trip, index) => (
                                    <CompletedTripCard
                                        key={index}
                                        loading={false}
                                        trip={trip}
                                    />
                                ))
                            ) : (
                                <Box>
                                    <Text align="center">
                                        No has realizado tu primer viaje aún!
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
                <CompletedTripCard key={index} loading={true} />
            ))}
        </>
    );
}

function CompletedTripCard({
    loading,
    trip
}: {
    loading: boolean;
    trip?: CompletedTrip;
}) {
    const { date } = useUtils();

    if (loading || !trip) {
        return (
            <Skeleton
                type={'rectangle'}
                loading={true}
                style={{ borderRadius: 30, height: 100, marginBottom: 20 }}
            />
        );
    }

    const MetodoPago = (trip:CompletedTrip)=>{

        if(
            trip.type === 'FPAY' 
            && getPaymentMethodName(trip.paymentMethod) === 'Código QR'
        ) return 'Código QR Fpay';

        if(
            trip.type === 'FPAY' 
            && getPaymentMethodName(trip.paymentMethod) === 'Débito/Crédito'
        ) return 'Débito/Crédito Fpay';

        return getPaymentMethodName(trip.paymentMethod)
    }

    return (
        <Box
            backgroundColor="greyLight"
            borderRadius={30}
            // height={130}
            mb="m"
            p="m"
        >
            {/* <Text>{JSON.stringify(trip)}</Text> */}
            <Box
                flexDirection="row"
                justifyContent="flex-end"
                alignItems="center"
                mb="s"
            >
                
                <Text color="black" bold variant="small">
                    {date.format(trip.acceptedAt, 'DD-MM-YYYY HH:mm')}
                </Text>
            </Box>
            <Box flexDirection="column" justifyContent="center" height={35}>
                <Box flex={1} justifyContent="center">
                    <Text variant="body" numberOfLines={1}>
                        <Text bold variant="body">
                            Origen:{' '}
                        </Text>
                        {trip.origin.address}{' '}
                    </Text>
                </Box>

                <Box flex={1} justifyContent="center">
                    <Text variant="body" numberOfLines={1}>
                        <Text bold variant="body">
                            Destino:{' '}
                        </Text>
                        {trip.destination.address}{' '}
                    </Text>
                </Box>
            </Box>
            <Box
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                mt="m"
            >
                <Box flex={1} alignItems="center" justifyContent="center">
                    <Box mb="xs">
                        <Text bold numberOfLines={1}>
                            Conductor:
                        </Text>
                    </Box>
                    <Text numberOfLines={1}>
                        {trip.driver.firstName} {trip.driver.lastName}
                    </Text>
                </Box>
                <Box flex={0.6} alignItems="flex-end" justifyContent="center">
                    <Box mb="xs">
                        <Text variant="heading3" bold>
                            {trip.finalFee.amount} {trip.finalFee.currency}
                        </Text>
                    </Box>

                    <Text variant="xsmall" align="center">
                        {MetodoPago(trip)}
                    </Text>
                </Box>
            </Box>
        </Box>
    );
}

function getPaymentMethodName(key) {
    switch (key) {
        case 'CASH':
            return 'Efectivo';
        case 'CREDIT.CARD':
            return 'Débito/Crédito';
        case 'QR':
            return 'Código QR';
    }
}
