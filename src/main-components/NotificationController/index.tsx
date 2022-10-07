import Box from '@main-components/Box';
import Snackbar from '@main-components/Snackbar';
import useNotificationProvider from '@shared/domain/hooks/use-notification-provider';
import React from 'react';
import { Platform } from 'react-native';

export default function NotificationController() {
    const { text, action, show, dispatch, autoHideDuration, notificationType } =
        useNotificationProvider((state) => ({
            text: state.text,
            show: state.show,
            dispatch: state.dispatch,
            autoHideDuration: state.autoHideDuration,
            notificationType: state.notificationType,
            action: state.action
        }));

    if (notificationType == 'screen') return <Box />;

    return (
        <Box width="100%" justifyContent="center" alignItems="center">
            <Box
                maxWidth={Platform.OS === 'web' ? 500 : undefined}
                width="100%"
                flex={1}
            >
                <Snackbar
                    text={text}
                    type={notificationType || 'info'}
                    onDismiss={() => {
                        dispatch({ type: 'HIDE_NOTIFICATION' });
                    }}
                    visible={show}
                    duration={autoHideDuration}
                    action={action}
                />
            </Box>
        </Box>
    );
}
