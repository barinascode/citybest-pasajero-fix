import Box from '@main-components/Box';
import LoopingVideo from '@main-components/LoopingVideo';
import Modal from '@main-components/Modal';
import useGetActiveTrip from '@modules/request/application/hooks/use-get-active-trip';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import React from 'react';
import TripNotificationCard from '../TripNotificationCard';

interface ProcessingPaymentNotificationCardProps {}
export default function ProcessingPaymentNotificationCard(
    props: ProcessingPaymentNotificationCardProps
) {
    const theme = useTheme();
    const { width } = useDimensions();

    const w = width;
    return (
        <TripNotificationCard
            style={{
                width: '100%',
                backgroundColor: 'transparent',
                borderRadius: 8,
                justifyContent: 'center',
                alignSelf: 'center',
                height: 250
            }}
        >
            <Box width={'100%'} justifyContent="center" alignItems="center">
                <LoopingVideo
                    source={images.PROCESSING_PAYMENT}
                    resizeMode="cover"
                    style={{
                        width: w - 30,
                        height: 250
                    }}
                />
            </Box>
        </TripNotificationCard>
    );
}

export function ProcessingPaymentNotificationCardController() {
    const { trip } = useGetActiveTrip();

    const active =
        !!trip &&
        trip.status === 'FINISHED' &&
        !trip.isCharged &&
        !trip.isPaid &&
        !trip.isRated;

    return (
        <Modal
            visible={active}
            contentContainerStyle={{
                backgroundColor: 'transparent'
            }}
            onDismiss={() => {}}
        >
            <ProcessingPaymentNotificationCard />
        </Modal>
    );
}
