import Box from '@main-components/Box';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { HelperText } from 'react-native-paper';

interface InputTextHelperProps {
    error?: any;
    helperText?: string;
}

export default function InputTextHelper(props: InputTextHelperProps) {
    const hasHelperText = !!props.helperText;
    const theme = useTheme();
    const hasError = !!props.error;
    return (
        <Box>
            <HelperText
                type={hasError ? 'error' : 'info'}
                theme={{ colors: { error: theme.colors.dangerMain } }}
                visible={hasError || hasHelperText}
            >
                {hasError ? props.error : props.helperText}
            </HelperText>
        </Box>
    );
}
