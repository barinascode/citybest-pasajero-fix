import Box from '@main-components/Box';
import Rating, { RatingProps } from '@main-components/Rating';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { HelperText } from 'react-native-paper';

export interface BaseRatingInputProps
    extends Omit<RatingProps, 'onFinish' | 'isDisabled' | 'count'> {
    value: number;
    disabled?: boolean;
    onChange?: (num: any) => void;
    error?: string;
}

export default function BaseSpinnerInput(props: BaseRatingInputProps) {
    const theme = useTheme();
    return (
        <Box>
            <Rating
                count={props.value || 0}
                onFinish={(num) => {
                    props.onChange && props.onChange(num);
                }}
                isDisabled={props.disabled ?? false}
                {...props}
            />
            {props.error && (
                <Box>
                    <HelperText
                        type="error"
                        theme={{ colors: { error: theme.colors.dangerMain } }}
                        visible={!!props.error}
                    >
                        {props.error}
                    </HelperText>
                </Box>
            )}
        </Box>
    );
}
