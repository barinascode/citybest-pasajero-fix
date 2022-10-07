import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import { HelperText } from 'react-native-paper';

export interface BaseSpinnerInputProps {
    value: number;
    max: number;
    min: number;
    onChange?: (num: any) => void;
    error?: string;
    buttons?: {
        style?: StyleProp<ViewStyle>;
        buttonMaxColor?: string;
        buttonMinColor?: string;
        textColor?: string;
    };
    color?: string;
    containerStyle?: StyleProp<ViewStyle>;
    skin?: 'round' | 'clean';
    step?: number;
    longStep?: number;
    label?: string;
}

export default function BaseSpinnerInput(props: BaseSpinnerInputProps) {
    const theme = useTheme();
    return (
        <Box>
            {props.label && (
                <Box mb="s">
                    <Text
                        variant="inputLabel"
                        color={props.error ? 'dangerMain' : 'inputLabelColor'}
                    >
                        {props.label}
                    </Text>
                </Box>
            )}

            <InputSpinner
                value={props.value}
                skin={props.skin ?? 'round'}
                max={props.max}
                min={props.min}
                longStep={props.longStep}
                step={props.step}
                style={{ elevation: 0, ...(props.containerStyle ?? {}) }}
                colorMax={
                    props.skin == 'clean'
                        ? undefined
                        : props.buttons?.buttonMaxColor ??
                          theme.colors.primaryMain
                }
                colorMin={
                    props.skin == 'clean'
                        ? undefined
                        : props.buttons?.buttonMinColor ??
                          theme.colors.primaryMain
                }
                buttonTextColor={props.buttons?.textColor}
                color={props.color}
                onChange={(num) => {
                    props.onChange && props.onChange(num);
                }}
                buttonStyle={props.buttons?.style}
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
