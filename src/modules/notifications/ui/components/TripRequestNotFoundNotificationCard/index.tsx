import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Image from '@main-components/Image';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useCancelRequest from '@modules/request/application/hooks/use-cancel-request';
import useGetActiveTripRequest from '@modules/request/application/hooks/use-get-trip-request';
import useRetryRequest from '@modules/request/application/hooks/use-retry-request';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import React from 'react';
import TripNotificationCard from '../TripNotificationCard';

interface TripRequestNotFoundNotificationCardProps {
    onRetryRequest: any;
    onCancelRequest: any;
    canceling: boolean;
    retrying: boolean;
}

export default function TripRequestNotFoundNotificationCard(
    props: TripRequestNotFoundNotificationCardProps
) {
    const theme = useTheme();

    return (
        <TripNotificationCard>
            <Box height={300} justifyContent="center" alignItems="center">
                <Box alignItems="center" justifyContent="center" mb="m">
                    <Image
                        source={images.SERVICE_NOT_FOUND}
                        style={{
                            width: 120,
                            height: 40,
                            resizeMode: 'contain'
                        }}
                    />
                </Box>
                <Box alignItems="center" justifyContent="center" mb="m">
                    <Text bold align="center" variant="heading2" color="white">
                        No hemos encontrado ningún City cerca de tu ubicación.
                    </Text>
                </Box>

                <Box alignItems="center" justifyContent="center" mb="m">
                    <Text align="center" variant="heading3" color="white">
                        Para tu rápida respuesta vamos a expandir tu radio de
                        búsqueda
                    </Text>
                </Box>

                <Box alignItems="center" justifyContent="center" mt="m" mb="m">
                    <Text align="center" variant="heading3" color="white">
                        ¿Estas de acuerdo?
                    </Text>
                </Box>

                <Box flexDirection="row" mt="l">
                    <Box mr="m">
                        <Button
                            onPress={() => {
                                props.onCancelRequest();
                            }}
                            rounded={false}
                            title="No"
                            mode="outlined"
                            backgroundColor="successMain"
                            loading={props.canceling}
                            disabled={props.canceling}
                        />
                    </Box>
                    <Box ml="m">
                        <Button
                            onPress={() => {
                                props.onRetryRequest();
                            }}
                            rounded={false}
                            title="Sí"
                            backgroundColor="successMain"
                            loading={props.retrying}
                            disabled={props.retrying}
                        />
                    </Box>
                </Box>
            </Box>
        </TripNotificationCard>
    );
}

export function TripRequestNotFoundNotificationCardController() {
    const { request } = useGetActiveTripRequest();
    const { retry, loading: retrying } = useRetryRequest();
    const { cancel, loading: canceling } = useCancelRequest();

    const active =
        !!request && request.status === 'DRIVERS_NOT_FOUND_IN_ATTEMPT';

    return (
        <Modal
            visible={active}
            contentContainerStyle={{
                backgroundColor: 'transparent'
            }}
        >
            <TripRequestNotFoundNotificationCard
                onCancelRequest={() => {
                    cancel();
                }}
                onRetryRequest={() => {
                    retry();
                }}
                canceling={canceling}
                retrying={retrying}
            />
        </Modal>
    );
}
