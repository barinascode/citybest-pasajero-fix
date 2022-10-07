import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { Modal as BaseModal, Portal } from 'react-native-paper';

export interface ModalProps {
    visible: boolean;
    onDismiss?: () => void;
    contentContainerStyle?: any;
    style?: any;
    children: React.ReactNode;
    dismissable?: boolean;
    showBackdrop?: boolean;
}

export default function Modal({ showBackdrop = true, ...props }: ModalProps) {
    const theme = useTheme();

    return (
        <Portal>
            <BaseModal
                {...props}
                contentContainerStyle={[
                    {
                        backgroundColor: 'white',
                        padding: theme.spacing.l,
                        borderRadius: theme.borderRadius.s
                    },
                    {
                        ...props.contentContainerStyle
                    }
                ]}
                theme={
                    showBackdrop
                        ? undefined
                        : {
                              colors: {
                                  backdrop: 'transparent'
                              }
                          }
                }
            >
                {props.children}
            </BaseModal>
        </Portal>
    );
}
