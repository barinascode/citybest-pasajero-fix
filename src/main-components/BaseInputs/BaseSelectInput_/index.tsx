import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { Picker } from '@react-native-picker/picker';
import { useUtils } from '@shared/domain/hooks/use-utils';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React, { cloneElement } from 'react';
import { Platform } from 'react-native';
import { BaseTextInputProps } from '../BaseTextInput';

export interface BaseSelectInputProps
    extends Pick<BaseTextInputProps, 'dense' | 'leftIcon' | 'left' | 'right'> {
    value?: string;
    ref?: any;
    error?: string;
    onChange?: any;
    options: { name: string; id: string | number }[];
    mode?: 'dialog' | 'dropdown';
    inputMode?: 'outlined' | 'flat';
    placeholder?: string;
    style?: any;
    label?: string;
    showUnderline?: boolean;
    containerStyle?: any;
    inputStyle?: any;
}

const BaseSelectInput = (props: BaseSelectInputProps) => {
    const {
        ref,
        value,
        onChange,
        options,
        mode,
        placeholder,
        showUnderline = true,
        inputMode = 'flat',
        error,
        ...rest
    } = props;
    const theme = useTheme();
    const utils = useUtils();
    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
            ? theme.iconSizes[props.leftIcon?.size]
            : 25;

    return (
        <Box
            justifyContent="center"
            position="relative"
            mb="m"
            style={{ ...(props.containerStyle || {}) }}
        >
            <Box
                style={{
                    borderBottomWidth:
                        showUnderline && inputMode == 'flat'
                            ? 1
                            : inputMode == 'outlined'
                            ? 1
                            : 0,
                    borderBottomColor: error
                        ? theme.colors.dangerMain
                        : inputMode == 'outlined'
                        ? theme.colors.greyMain
                        : theme.colors.greyMain,
                    borderColor:
                        inputMode == 'outlined'
                            ? error
                                ? theme.colors.dangerMain
                                : theme.colors.greyMain
                            : undefined,
                    borderWidth: inputMode == 'outlined' ? 1 : undefined,
                    borderRadius: inputMode == 'outlined' ? 4 : undefined
                }}
            >
                {props.label && (
                    <Text
                        variant="inputLabel"
                        color={props.error ? 'dangerMain' : 'inputLabelColor'}
                    >
                        {props.label}
                    </Text>
                )}
                <Box justifyContent="center">
                    <Box
                        position="absolute"
                        left={10}
                        flexDirection="row"
                        alignItems="center"
                        width={leftCompWidth + leftBoxWidth}
                        zIndex={9999}
                    >
                        {props.leftIcon && (
                            <Box
                                position="relative"
                                bottom={0}
                                right={0}
                                zIndex={9999}
                            >
                                <AppIcon
                                    name={props.leftIcon.name}
                                    color={theme.colors.inputPlaceholderColor}
                                    size={leftBoxWidth}
                                />
                            </Box>
                        )}
                        {props.left && (
                            <Box
                                justifyContent="center"
                                top={Platform.OS === 'web' ? 0 : 6}
                                width={props.left.width}
                                left={props.leftIcon ? 0 : 0}
                                zIndex={9999}
                            >
                                {props.left.component &&
                                    cloneElement(props.left.component, {
                                        control: props.control
                                    })}
                            </Box>
                        )}
                    </Box>
                    <Box
                        style={{
                            paddingLeft: props.leftIcon
                                ? leftCompWidth + leftBoxWidth + 10
                                : undefined,
                            justifyContent: 'center'
                        }}
                    >
                        <Picker
                            /* ref={ref} */
                            {...rest}
                            selectedValue={value}
                            style={{
                                ...props.style,
                                fontFamily: theme.textVariants.body.fontFamily,
                                height: 50,
                                minWidth: 150,
                                ...props.inputStyle
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                                onChange(itemValue)
                            }
                            mode={mode || 'dialog'}
                        >
                            {value === '' && (
                                <Picker.Item
                                    label={
                                        placeholder || 'Please select an option'
                                    }
                                    value={undefined}
                                    color="grey"
                                />
                            )}

                            {options.map((option) => (
                                <Picker.Item
                                    key={option.id}
                                    label={option.name}
                                    value={option.id}
                                />
                            ))}
                        </Picker>
                    </Box>
                </Box>
            </Box>

            {error && (
                <Box style={{ marginTop: 8, marginLeft: 10 }}>
                    <Text color="dangerMain" variant="small">
                        {error ? error : undefined}
                    </Text>
                </Box>
            )}
        </Box>
    );
};

export default BaseSelectInput;
