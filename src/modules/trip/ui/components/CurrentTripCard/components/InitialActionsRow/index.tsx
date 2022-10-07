import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Icon from '@main-components/Icon';
import Modal from '@main-components/Modal';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import React, { useState } from 'react';
import CancelTripNotificationCard from '../../../CancelTripNotificationCard';

interface InitialActionsRowProps {
    onCall: any;
    canceling: boolean;
    onCancel: any;
}
export function InitialActionsRow(props: InitialActionsRowProps) {
    const theme = useTheme();
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    return (
        <>
            <Box width="100%" mt="s">
                <Button
                    onPress={() => {
                        props.onCall();
                    }}
                    icon={() => (
                        <AppIcon
                            size={20}
                            name="phone"
                            color={theme.colors.successMain}
                        />
                    )}
                    block
                    backgroundColor="primaryMain"
                    title="Llamar al conductor"
                    rounded={false}
                />

                <Box mt="s">
                    <Button
                        onPress={() => {
                            setShowCancelAlert(true);
                        }}
                        icon={() => (
                            <Icon numberSize={20} name="times" color="white" />
                        )}
                        block
                        backgroundColor="primaryMain"
                        title="Cancelar viaje"
                        rounded={false}
                    />
                </Box>
            </Box>
            <Modal
                visible={showCancelAlert}
                dismissable={true}
                contentContainerStyle={{
                    backgroundColor: 'transparent',
                    padding: 10
                }}
                onDismiss={() => {
                    setShowCancelAlert(false);
                }}
            >
                <CancelTripNotificationCard
                    onConfirm={() => {
                        props.onCancel();
                    }}
                    canceling={false}
                    confirming={props.canceling}
                    onCancel={() => {
                        setShowCancelAlert(false);
                    }}
                />
            </Modal>
        </>
    );
}
