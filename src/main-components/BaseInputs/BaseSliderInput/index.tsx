import Box from '@main-components/Box';
import Slider from '@main-components/Slider';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { HelperText } from 'react-native-paper';

export interface BaseSliderInputProps {
    value: number;
    max: number;
    min: number;
    step: number;
    onChange?: (num: any) => void;
    error?: string;
}

export default function BaseSliderInput(props: BaseSliderInputProps) {
    const theme = useTheme();

    return (
        <Box>
            <Slider
                value={props.value}
                max={props.max}
                step={props.step}
                min={props.min}
                onChange={(num) => {
                    props.onChange && props.onChange(num);
                }}
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
