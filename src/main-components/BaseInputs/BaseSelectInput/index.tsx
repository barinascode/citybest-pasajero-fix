import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import InputTextHelper from '@main-components/Form/InputTextHelper';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import { Picker } from '@react-native-picker/picker';
import { OptionText } from '@shared/form/useChoices';
import React, { cloneElement } from 'react';
import { Platform } from 'react-native';
import { BaseTextInputProps } from '../BaseTextInput';

export interface BaseSelectInputProps
    extends Pick<BaseTextInputProps, 'dense' | 'leftIcon' | 'left' | 'right'> {
    value?: string;
    ref?: any;
    error?: string;
    onChange?: any;
    options: {
        [prop: string]: any;
        value?: any;
        name: string;
        id: string | number;
    }[];
    optionText?: OptionText;
    optionValue?: string;
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
        optionValue,
        optionText,
        ...rest
    } = props;
    const theme = useTheme();

    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
            ? theme.iconSizes[props.leftIcon?.size]
            : 25;

    const finalOptionValue = optionValue ? optionValue : 'id';
    const finalOptionText = optionText ? optionText : 'name';

    const borderColor = error
        ? theme.colors.dangerMain
        : Platform.OS === 'web'
        ? theme.colors.greyMedium
        : theme.colors.greyMain;
    const isFlat = inputMode == 'flat';
    const borderWidth = !showUnderline
        ? 0
        : showUnderline && isFlat
        ? 1
        : isFlat
        ? 1
        : 0;

    return (
        <Box
            justifyContent="center"
            position="relative"
            mb="m"
            style={{
                ...(props.containerStyle || {})
            }}
        >
            <Box
                style={{
                    ...(isFlat && {
                        borderBottomWidth: borderWidth,
                        borderBottomColor: borderColor
                    }),
                    ...(!isFlat && {
                        borderColor: borderColor,
                        borderWidth: 1,
                        borderRadius: 4,
                        ...Platform.select({
                            web: {
                                border: `1px solid ${borderColor}`,
                                overflow: 'hidden'
                            }
                        })
                    })
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
                                zIndex={9999999}
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
                            itemStyle={{
                                fontSize: theme.textVariants.body.fontSize,
                                lineHeight: theme.textVariants.body.lineHeight
                            }}
                            style={{
                                fontFamily: theme.textVariants.body.fontFamily,
                                lineHeight: theme.textVariants.body.lineHeight,
                                height: 50,
                                ...props.style,
                                minWidth: 150,
                                ...props.inputStyle,
                                ...Platform.select({
                                    web: {
                                        border: 0,
                                        backgroundColor: 'white',
                                        outline: 'none'
                                    }
                                })
                            }}
                            onValueChange={(itemValue, itemIndex) =>
                                onChange(itemValue)
                            }
                            mode={mode || 'dialog'}
                        >

                                <Picker.Item
                                    label={
                                        placeholder || 'Please select an option'
                                    }
                                    value={undefined}
                                    color="grey"
                                    fontFamily={
                                        theme.textVariants.body.fontFamily
                                    }
                                />
                            

                            {options.map((option) => (
                                <Picker.Item
                                    key={option.id}
                                    label={option[finalOptionText.toString()]}
                                    value={option[finalOptionValue]}
                                    fontFamily={
                                        theme.textVariants.body.fontFamily
                                    }
                                />
                            ))}
                        </Picker>
                    </Box>
                </Box>
            </Box>

            {error && (
                <Box>
                    <InputTextHelper error={props.error} />
                </Box>
            )}
        </Box>
    );
};

export default BaseSelectInput;
