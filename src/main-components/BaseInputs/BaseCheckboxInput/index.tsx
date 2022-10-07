import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Checkbox as BaseCheckbox, HelperText } from 'react-native-paper';

export interface BaseCheckboxInputProps {
    checked?: boolean;
    onChange?: any;
    value?: any;
    title: string | React.ReactElement<{}>;
    error?: any;
    style?: any;
    actionOnLabel?: boolean;
}

export default function BaseCheckboxInput({
    title,
    checked,
    onChange,
    value,
    error,
    actionOnLabel = true,
    ...rest
}: BaseCheckboxInputProps) {
    const theme = useTheme();

    const isChecked = !!value;

    const onCheck = () => {
        onChange && onChange(!isChecked === true ? true : undefined);
    };

    return (
        <Box style={rest.style}>
            <Box flexDirection="row" alignItems="center">
                <Box width={40}>
                    <BaseCheckbox
                        status={isChecked ? 'checked' : 'unchecked'}
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
                        uncheckedColor={theme.colors.greyMain}
                        color={theme.colors.primaryMain}
                        onPress={onCheck}
                    />
                </Box>
                <Box flex={1}>
                    {actionOnLabel && (
                        <TouchableOpacity onPress={onCheck}>
                            {typeof title == 'string' ? (
                                <Text variant="body">{title}</Text>
                            ) : (
                                title
                            )}
                        </TouchableOpacity>
                    )}

                    {!actionOnLabel && (
                        <>
                            {typeof title == 'string' ? (
                                <Text variant="body">{title}</Text>
                            ) : (
                                title
                            )}
                        </>
                    )}
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
