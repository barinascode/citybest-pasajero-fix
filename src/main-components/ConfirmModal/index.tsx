import Box from '@main-components/Box';
import Button from '@main-components/Button';
import Modal, { ModalProps } from '@main-components/Modal';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';

interface ConfirmModalProps extends Omit<ModalProps, 'children'> {
    onConfirm: () => void;
    onClose?: () => void;
    showCancel?: boolean;
    title: string | JSX.Element;
    content: string | JSX.Element;
    cancelText?: string;
    confirmText?: string;
}

export default function ConfirmModal({
    showCancel = true,
    ...props
}: ConfirmModalProps) {
    const theme = useTheme();

    return (
        <Modal
            {...props}
            onDismiss={props.onClose}
            contentContainerStyle={{
                width: '75%',
                alignSelf: 'center',
                padding: 0
            }}
        >
            <Box style={{ paddingBottom: 0 }}>
                <Box
                    padding="m"
                    style={{ paddingBottom: 0 }}
                    justifyContent="center"
                    mb="s"
                >
                    <Box>
                        {typeof props.title !== 'string' ? (
                            props.title
                        ) : (
                            <Text color="black" variant="heading3">
                                {props.title}
                            </Text>
                        )}
                    </Box>
                    <Box></Box>
                </Box>
                <Box padding="m">
                    {typeof props.content !== 'string' ? (
                        props.content
                    ) : (
                        <Text color="greyMain" variant="body">
                            {props.content}
                        </Text>
                    )}
                </Box>
                <Box
                    width="100%"
                    bottom={0}
                    flexDirection="row"
                    justifyContent="center"
                    style={{
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8
                    }}
                >
                    <Box flex={0.5}>
                        {showCancel && (
                            <Button
                                title={props.cancelText || 'Cancelar'}
                                mode="text"
                                titleColor="greyMain"
                                compact
                                onPress={() => {
                                    props.onClose && props.onClose();
                                }}
                            />
                        )}
                    </Box>
                    <Box flex={0.5}>
                        <Button
                            title={props.confirmText || 'Aceptar'}
                            mode="text"
                            titleColor="greyMain"
                            compact
                            onPress={() => {
                                props.onConfirm();
                            }}
                        />
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
