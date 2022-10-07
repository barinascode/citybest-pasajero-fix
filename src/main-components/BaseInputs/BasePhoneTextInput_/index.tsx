import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import images from '@shared/domain/utils/constants/images';
import { onlyNumbers } from '@shared/form/filters';
import React, { useEffect, useRef, useState } from 'react';
import { HelperText } from 'react-native-paper';
import PhoneInput from 'react-native-phone-number-input';
import { BaseTextInputProps } from '../BaseTextInput';

export interface BasePhoneTextInputProps extends BaseTextInputProps {
    countryCodes?: string[];
    defaultCountryCode?: string;
}

export default function BasePhoneTextInput({
    dense = true,
    showUnderline = true,
    ...props
}: BasePhoneTextInputProps) {
    const phoneInput = useRef<PhoneInput>(null);
    const theme = useTheme();
    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
            ? theme.iconSizes[props.leftIcon?.size]
            : 25;
    const [formattedValue, setFormattedValue] = useState('');
    const [displayValue, setDisplayValue] = useState(props.defaultValue);

    useEffect(() => {
        setDisplayValue(props.defaultValue);
    }, [props.defaultValue]);

    const textInputStyles = props.mode == 'outlined' && {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.primaryMain,
        //marginLeft: leftBoxWidth + leftCompWidth + 20,
        marginRight: -15,
        paddingLeft: 15,
        height: 44,
        width: 800
    };
    return (
        <Box
            pointerEvents={props.pointerEvents}
            justifyContent="center"
            position="relative"
        >
            <Box>
                {props.label && typeof props.label === 'string' ? (
                    <Text
                        variant="inputLabel"
                        color={props.error ? 'dangerMain' : 'inputLabelColor'}
                    >
                        {props.label}
                    </Text>
                ) : props.label ? (
                    props.label({
                        variant: 'inputLabel',
                        color: props.error ? 'dangerMain' : 'inputLabelColor'
                    })
                ) : (
                    <Box />
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
                    </Box>

                    <Box>
                        <PhoneInput
                            ref={phoneInput}
                            {...props}
                            defaultValue={props.defaultValue}
                            defaultCode={props.defaultCountryCode as any}
                            layout="first"
                            containerStyle={{
                                elevation: 0,
                                paddingLeft: props.leftIcon
                                    ? leftCompWidth + leftBoxWidth + 5
                                    : undefined,
                                backgroundColor: 'transparent',
                                fontFamily: theme.textVariants.body.fontFamily,
                                ...props.style,
                                borderWidth:
                                    props.mode == 'outlined' ? 0 : undefined,
                                borderRadius:
                                    props.mode == 'outlined' ? 20 : undefined,
                                borderBottomWidth:
                                    props.mode == 'outlined' ? 0 : 1,
                                borderColor:
                                    props.mode == 'outlined'
                                        ? theme.colors.primaryMain
                                        : undefined,
                                borderBottomColor: showUnderline
                                    ? props.mode == 'outlined'
                                        ? theme.colors.primaryMain
                                        : theme.colors.greyMain
                                    : 'transparent',
                                width: '100%',
                                height: dense ? 40 : 60
                            }}
                            textInputStyle={{
                                height: dense ? 40 : 60,
                                ...textInputStyles
                            }}
                            textContainerStyle={{
                                backgroundColor: 'white',
                                bottom: 1,
                                borderRadius:
                                    props.mode == 'outlined' ? 20 : undefined,
                                ...(props.mode == 'outlined' && {
                                    marginTop: 1,
                                    marginRight: 1
                                })
                            }}
                            textInputProps={{
                                placeholderTextColor:
                                    theme.colors.inputPlaceholderColor,
                                value: displayValue,
                                onBlur: () => {
                                    const newValue =
                                        phoneInput.current?.getNumberAfterPossiblyEliminatingZero();

                                    if (newValue?.number == '') {
                                        return;
                                    }

                                    /*    props.onChangeText &&
                  props.onChangeText(newValue?.formattedNumber || ""); */
                                }
                            }}
                            onChangeText={(text) => {
                                const filteredValue = onlyNumbers(text);
                                // props.onChangeText && props.onChangeText(filteredValue);
                                props.onChangeText &&
                                    props.onChangeText(filteredValue);
                                setDisplayValue(filteredValue);
                            }}
                            onChangeFormattedText={(text) => {
                                setFormattedValue(text);
                            }}
                            flagButtonStyle={{}}
                            countryPickerButtonStyle={{
                                width: 50,
                                marginLeft: 10,
                                marginRight: -8,
                                zIndex: 999
                            }}
                            codeTextStyle={{
                                padding: 0
                            }}
                            //  withDarkTheme
                            autoFocus={props.autoFocus}
                            countryPickerProps={{
                                translation: 'spa',
                                closeButtonImage: images.CLOSE,
                                theme: {
                                    onBackgroundTextColor:
                                        theme.colors.greyMain,
                                    fontSize: 16
                                },
                                filterProps: {
                                    placeholder: 'Filtrar por país...'
                                },
                                countryCodes: props.countryCodes
                            }}
                        />
                    </Box>
                </Box>
                {props.error && (
                    <Box
                        style={{
                            marginLeft:
                                props.mode == 'outlined'
                                    ? leftBoxWidth + leftCompWidth + 20
                                    : undefined
                        }}
                    >
                        <HelperText
                            type="error"
                            theme={{
                                colors: { error: theme.colors.dangerMain }
                            }}
                            visible={!!props.error}
                        >
                            {props.error}
                        </HelperText>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
