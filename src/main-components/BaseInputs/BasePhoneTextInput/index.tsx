import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { onlyNumbers } from '@modules/_shared/form/filters';
import React, { useRef, useState } from 'react';
import { Platform } from 'react-native';
import { HelperText } from 'react-native-paper';
import { BaseTextInputProps } from '../BaseTextInput';
import PhoneInput from './PhoneInput';

export interface BasePhoneTextInputProps extends BaseTextInputProps {
    onChangeNumber? : any
}

export default function BasePhoneTextInput({
    dense = true,
    showUnderline = true,
    ...props
}: BasePhoneTextInputProps) {
    const phoneInput = useRef<any>(null);
    const theme = useTheme();
    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
            ? theme.iconSizes[props.leftIcon?.size]
            : 25;

    // const initialParts = getPhoneParts(props.defaultValue ?? props.value);

    const [initialParts, setInitialParts] = useState<any>({
        code: '57',
        number: ''
    });

    return (
        <Box
            pointerEvents={props.pointerEvents}
            justifyContent="center"
            position="relative"
        >
            <Box
                style={{
                    paddingBottom: Platform.OS == 'ios' ? 2 : undefined,
                    borderWidth: props.mode == 'outlined' ? 1 : undefined,
                    borderRadius: props.mode == 'outlined' ? 4 : undefined,
                    borderBottomWidth: 1,
                    borderColor:
                        props.mode == 'outlined'
                            ? theme.colors.greyMedium
                            : undefined,
                    borderBottomColor: showUnderline
                        ? props.mode == 'outlined'
                            ? theme.colors.greyMedium
                            : theme.colors.greyMain
                        : 'transparent'
                }}
            >
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

                    <PhoneInput
                        ref={phoneInput}
                        {...props}
                        onChangeNumber={props.onChangeNumber}
                        defaultValue={props.defaultValue}
                        defaultCode={initialParts.code}
                        defaultCountry={(props as any).defaultCountryCode}
                        layout="first"
                        containerStyle={{
                            elevation: 0,
                            paddingLeft: props.leftIcon
                                ? leftCompWidth + leftBoxWidth + 5
                                : undefined,
                            backgroundColor: 'transparent',
                            fontFamily: theme.textVariants.body.fontFamily,
                            ...props.style,
                            // borderWidth:
                            //     props.mode == 'outlined' ? 1 : undefined,
                            // borderRadius:
                            //     props.mode == 'outlined' ? 4 : undefined,
                            // borderBottomWidth: 1,
                            // borderColor:
                            //     props.mode == 'outlined'
                            //         ? theme.colors.greyMedium
                            //         : undefined,
                            // borderBottomColor: showUnderline
                            //     ? props.mode == 'outlined'
                            //         ? theme.colors.greyMedium
                            //         : theme.colors.greyMain
                            //     : 'transparent',
                            // width: '100%',
                            height: dense ? 40 : 60
                        }}
                        countryPickerButtonStyle={{
                            ...Platform.select({
                                web: {
                                    width: 60
                                }
                            }),
                            width: Platform.OS == 'ios' ? 23 : undefined
                        }}
                        textInputStyle={{
                            height: dense ? 40 : 60,
                            ...Platform.select({
                                web: {
                                    outline: 'none',
                                    paddingLeft: 10
                                }
                            })
                        }}
                        textContainerStyle={{
                            backgroundColor: 'transparent',
                            bottom: Platform.OS == 'android' ? 0 : 0,
                            height: 30,
                            maxHeight: 30,
                            alignSelf: 'center',
                            ...(props.mode == 'outlined' && {
                                marginTop: 1,
                                marginRight: 1
                            }),
                            ...Platform.select({
                                web: {
                                    padding: 0,
                                    paddingLeft: 10
                                }
                            })
                        }}
                        codeTextStyle={{
                            ...Platform.select({
                                web: {
                                    width: 50
                                }
                            })
                        }}
                        onChangeText={(text) => {
                            
                            const filteredValue = onlyNumbers(text);
                            // props.onChangeText && props.onChangeText(filteredValue);
                            props.onChangeText &&
                                props.onChangeText(filteredValue);
                        }}
                        //  withDarkTheme
                        autoFocus={props.autoFocus}
                        countryPickerProps={{
                            translation: 'spa',
                            closeButtonImage: images.CLOSE,
                            theme: {
                                onBackgroundTextColor: theme.colors.greyMain,
                                fontSize: 16
                            },
                            filterProps: {
                                placeholder: 'Escribe para filtrar por país...'
                            },
                            countryCodes: (props as any).countryCodes
                        }}
                    />
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
