import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React, { useState } from 'react';
import { TripCompletedNotificationCardController } from '../TripCompletedNotificationCard';
import TripNotificationCard from '../TripNotificationCard';

function SaveFavoriteDestinationNotificationCard(props: {
    onDecline: any;
    onAccept: any;
    accepting: boolean;
}) {
    const theme = useTheme();

    return (
        <TripNotificationCard>
            <Box height={270} justifyContent="center" alignItems="center">
                <Box alignItems="center" justifyContent="center" mb="m">
                    <AppIcon
                        name="star"
                        size={45}
                        color={theme.colors.successMain}
                    />
                </Box>
                <Box alignItems="center" justifyContent="center" mb="m">
                    <Text align="center" variant="heading3" color="white">
                        ¿Quieres guardar como destino favorito?
                    </Text>
                </Box>

                <Box mt="l">
                    <Box mb="m">
                        <Button
                            onPress={() => {
                                props.onAccept();
                            }}
                            rounded={false}
                            title="Sí"
                            backgroundColor="successMain"
                            loading={props.accepting}
                        />
                    </Box>
                    <Box mb="s">
                        <Button
                            onPress={() => {
                                props.onDecline();
                            }}
                            rounded={false}
                            title="No"
                            mode="outlined"
                            backgroundColor="successMain"
                        />
                    </Box>
                </Box>
            </Box>
        </TripNotificationCard>
    );
}

export function SaveFavoriteDestinationNotificationCardController({
    show,
    onDismiss,
    onAccept,
    accepting
}: {
    show: boolean;
    onDismiss: any;
    onAccept: any;
    accepting: boolean;
}) {
    const [showCompleted, setTripCompleted] = useState(false);

    return (
        <>
            <Modal
                visible={show}
                contentContainerStyle={{
                    backgroundColor: 'transparent',
                    border: 0,
                    margin: 0
                }}
                onDismiss={onDismiss}
            >
                <SaveFavoriteDestinationNotificationCard
                    onDecline={async () => {
                        await onDismiss();
                        setTripCompleted(true);
                    }}
                    onAccept={async () => {
                        await onAccept();
                        setTripCompleted(true);
                    }}
                    accepting={accepting}
                />
            </Modal>
            <TripCompletedNotificationCardController
                show={showCompleted}
                onDismiss={() => {
                    setTripCompleted(false);
                }}
            />
        </>
    );
}
