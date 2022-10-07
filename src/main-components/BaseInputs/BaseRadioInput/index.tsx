import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { HelperText, RadioButton as BaseRadioButton } from 'react-native-paper';

interface BaseRadioInputProps {
    checked?: boolean;
    onChange?: any;
    value: any;
    id: string;
    color: keyof Theme['colors'];
    uncheckedColor: keyof Theme['colors'];
    title: string | React.ReactElement<{}>;
    error?: any;
    style?: any;
}

export default function BaseRadioInput({
    title,
    error,
    value,
    ...props
}: BaseRadioInputProps) {
    const theme = useTheme();
    const isChecked = props.checked;

    const onCheck = () => {
        props.onChange &&
            props.onChange(!isChecked === true ? true : undefined);
    };
    return (
        <Box style={props.style}>
            <Box flexDirection="row" alignItems="center">
                <Box>
                    <BaseRadioButton
                        value={value}
                        onPress={onCheck}
                        color={theme.colors[props.color]}
                        uncheckedColor={theme.colors[props.uncheckedColor]}
                        status={props.checked ? 'checked' : 'unchecked'}
                        theme={{
                            fonts: {
                                regular: {
                                    fontFamily:
                                        theme.textVariants.body.fontFamily
                                },
                                medium: {
                                    fontFamily:
                                        theme.textVariants.body.fontFamily
                                },
                                thin: {
                                    fontFamily:
                                        theme.textVariants.body.fontFamily
                                }
                            },
                            colors: {
                                placeholder: theme.colors.inputPlaceholderColor,
                                text: theme.colors.textInputColor,
                                error: theme.colors.dangerMain,
                                primary: theme.colors.primaryMain
                            }
                        }}
                    />
                </Box>
                <Box flex={1}>
                    <TouchableOpacity onPress={onCheck}>
                        {typeof title == 'string' ? (
                            <Text variant="body">{title}</Text>
                        ) : (
                            title
                        )}
                    </TouchableOpacity>
                </Box>
            </Box>
            {error && (
                <Box>
                    <HelperText
                        type="error"
                        theme={{
                            fonts: {
                                thin: {
                                    fontFamily:
                                        theme.textVariants.body.fontFamily
                                },
                                regular: {
                                    fontFamily:
                                        theme.textVariants.body.fontFamily
                                },
                                medium: {
                                    fontFamily:
                                        theme.textVariants.body.fontFamily
                                }
                            },
                            colors: { error: theme.colors.dangerMain }
                        }}
                        visible={!!error}
                    >
                        {error}
                    </HelperText>
                </Box>
            )}
        </Box>
    );
}
