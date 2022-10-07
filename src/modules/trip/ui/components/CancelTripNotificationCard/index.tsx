import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Text from '@main-components/Text';
import TripNotificationCard from '@modules/notifications/ui/components/TripNotificationCard';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
interface CancelTripNotificationCardProps {
    onConfirm: () => void;
    onCancel: () => void;
    confirming: boolean;
    canceling: boolean;
}

export default function CancelTripNotificationCard(
    props: CancelTripNotificationCardProps
) {
    const theme = useTheme();

    return (
        <TripNotificationCard>
            <Box height={320} justifyContent="center" alignItems="center">
                <Box>
                    <AppIcon
                        color={theme.colors.white}
                        name="car-warning-round"
                        size={60}
                    />
                </Box>
                <Box mb="m" mt="m">
                    <Text align="center" variant="heading2" color="white">
                        ¿Estás seguro que deseas cancelar el viaje actual?
                    </Text>
                </Box>

                <Box maxWidth="50%" mt="l">
                    <Box mb="m">
                        <Button
                            loading={props.confirming}
                            block
                            onPress={() => {
                                props.onConfirm();
                            }}
                            title="Sí"
                            uppercase={false}
                            backgroundColor="white"
                            titleColor="black"
                        />
                    </Box>
                    <Box mb="s">
                        <Button
                            loading={props.canceling}
                            block
                            onPress={() => {
                                props.onCancel();
                            }}
                            title="No"
                            mode="outlined"
                            uppercase={false}
                            backgroundColor="white"
                        />
                    </Box>
                </Box>
            </Box>
        </TripNotificationCard>
    );
}
