import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import Image from '@main-components/Image';
import Text, { TextProps } from '@main-components/Text';
import images from '@modules/_shared/domain/utils/constants/images';
import { useUtils } from '@shared/domain/hooks/use-utils';
import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import { getProfileState, profileActions } from 'integration/modules/Profile/store/profile.slice';
import { getRegisterState, registerActions } from 'integration/modules/Register/store/register.slice';
import { isValidEmailString } from 'integration/shared/tools/isValidEmailString';
import React, { cloneElement, useState } from 'react';
import { Platform, TextInputProps, TouchableOpacity } from 'react-native';
import { HelperText, TextInput as PaperInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon, { IconProps } from '../../Icon';

export interface BaseTextInputProps extends TextInputProps {
    placeholder?: string;
    leftIcon?: IconProps;
    rightIcon?: IconProps & { onPress?: any };
    left?: {
        width: number;
        component: React.ReactNode;
    };
    right?: {
        width: number;
        component: React.ReactNode;
    };
    borderColor?: keyof Theme['colors'];
    backgroundColor?: keyof Theme['colors'];
    value?: string;
    error?: boolean;
    label?: (props: TextProps) => JSX.Element | string;
    mode?: 'flat' | 'outlined';
    disabled?: boolean;
    control?: any; // form control
    wrapper?: React.ReactNode;
    render?: any;
    style?: any;
    dense?: boolean;
    showUnderline?: boolean;
    filterText?: (text: string) => string;
    inputPlaceholderColor?: keyof Theme['colors'];
    textInputColor?: keyof Theme['colors'];
    image?: any;
    outlineColor?: keyof Theme['colors'];
    source?: string;
}

function BaseTextInput(
    {
        borderColor = 'secondaryMain',
        backgroundColor = 'secondaryLight',
        mode = 'flat',
        dense = true,
        showUnderline = true,
        ...props
    }: BaseTextInputProps,
    ref: any
) {
    const theme = useTheme();
    const utils = useUtils();
    const leftCompWidth = props.left?.width ? props.left?.width : 0;
    const leftBoxWidth =
        props.leftIcon?.size == 'm'
            ? 25
            : props.leftIcon?.size
                ? theme.iconSizes[props.leftIcon?.size]
                : 25;

    // const rightCompWidth = props.right?.width ? props.right?.width : 0;
    // const rightBoxWidth =
    //     props.rightIcon?.size == 'm'
    //         ? 30
    //         : props.rightIcon?.size
    //             ? theme.iconSizes[props.rightIcon?.size]
    //             : 25;

    const ValidateEmail = (email: any) => {
        if (email !== "" && isValidEmailString(email)) {
            seterrorEmail({
                error: false,
                message: ''
            })
        } else if (email == "") {
            seterrorEmail({
                error: true,
                message: 'Ingrese este campo por favor'
            })
        } else {
            seterrorEmail({
                error: true,
                message: 'El email ingresado no es válido'
            })
        }
    }

    const dispatch = useDispatch();
    const profileState = useSelector(getProfileState)
    const registerState = useSelector(getRegisterState)
    const [errorEmail, seterrorEmail] = useState({
        error: false,
        message: ''
    })

    React.useMemo(() => {
        if (registerState.formSended) {
            console.log("here validation register")
            dispatch(registerActions.updateRegisterInfo({ key: 'fieldErrors', value: props.value }))
        }else if(profileState.formSended){
            console.log("here validation profile")
            dispatch(profileActions.updateProfileKey({ key: 'fieldErrors', value: props.value }))
        }
    }, [props.value])


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
                ) : (
                    props.label &&
                    props.label({
                        variant: 'inputLabel',
                        color: props.error ? 'dangerMain' : 'inputLabelColor'
                    })
                )}

                <Box justifyContent="center">
                    <Box
                        position="absolute"
                        left={4}
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
                                    color={
                                        props.leftIcon.color
                                            ? theme.colors[props.leftIcon.color]
                                            : theme.colors.inputPlaceholderColor
                                    }
                                    size={leftBoxWidth}
                                />
                            </Box>
                        )}

                        {props.image && (
                            <Image
                                source={props.image}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
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
                        style={
                            mode == 'outlined' && {
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: (props.error || errorEmail.error)
                                    ? 'red'
                                    : theme.colors.primaryMain,
                                marginLeft: leftBoxWidth + leftCompWidth + 20,
                                marginRight: 0
                            }
                        }
                    >
                        <PaperInput
                            {...utils.object.omit(props, ['ref'])}
                            render={props.render}
                            disabled={props.disabled}
                            ref={ref}
                            error={mode === 'flat' ? !!props.error : undefined}
                            pointerEvents={props.pointerEvents}
                            label={undefined}
                            selectionColor={theme.colors.textInputColor}
                            underlineColor={
                                showUnderline && mode == 'flat'
                                    ? theme.colors.greyMain
                                    : 'transparent'
                            }
                            dense={dense}
                            style={{
                                paddingLeft:
                                    props.leftIcon && mode == 'flat'
                                        ? leftCompWidth + leftBoxWidth + 5
                                        : undefined,
                                backgroundColor: 'transparent',
                                fontFamily: theme.textVariants.body.fontFamily,
                                height: 36,
                                ...props.style
                            }}
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
                                    placeholder:
                                        props.inputPlaceholderColor ??
                                        theme.colors.inputPlaceholderColor,
                                    text:
                                        props.textInputColor ??
                                        theme.colors.textInputColor,
                                    error: theme.colors.dangerMain,
                                    primary:
                                        showUnderline && mode == 'flat'
                                            ? theme.colors.primaryMain
                                            : 'transparent'
                                }
                            }}
                        />

                        <Box
                            position="absolute"
                            right={10}
                            bottom={10}
                            zIndex={9999}
                        >
                            {props.right?.component}
                        </Box>
                    </Box>

                    {props.rightIcon && (
                        <Box
                            justifyContent="center"
                            position="absolute"
                            right={10}
                            zIndex={9999}
                        >
                            <TouchableOpacity onPress={props.rightIcon.onPress}>
                                <Icon
                                    name={props.rightIcon.name}
                                    color={
                                        props.rightIcon?.color ||
                                        'inputPlaceholderColor'
                                    }
                                    type={props.rightIcon.type}
                                    numberSize={
                                        props.rightIcon?.size === 'm'
                                            ? 30
                                            : theme.iconSizes[
                                            props.rightIcon?.size
                                            ]
                                    }
                                    style={props.rightIcon.style}
                                />
                            </TouchableOpacity>
                        </Box>
                    )}
                </Box>
            </Box>

            {props.error && (
                <Box
                    style={{
                        marginLeft:
                            mode == 'outlined'
                                ? leftBoxWidth + leftCompWidth + 20
                                : undefined
                    }}
                >
                    <HelperText
                        type="error"
                        theme={{ colors: { error: theme.colors.dangerMain } }}
                        visible={!!props.error}
                    >

                        Ingrese este campo por favor
                    </HelperText>
                </Box>
            )}


            {/* {props.error && props.source !== "email" && (
                <Box
                    style={{
                        marginLeft:
                            mode == 'outlined'
                                ? leftBoxWidth + leftCompWidth + 20
                                : undefined
                    }}
                >
                    <HelperText
                        type="error"
                        theme={{ colors: { error: theme.colors.dangerMain } }}
                        visible={!!props.error}
                    >

                        Ingrese este campo por favor
                    </HelperText>
                </Box>
            )} */}

            {errorEmail.error && (
                <Box
                    style={{
                        marginLeft:
                            mode == 'outlined'
                                ? leftBoxWidth + leftCompWidth + 20
                                : undefined
                    }}
                >
                    <HelperText
                        type="error"
                        theme={{ colors: { error: theme.colors.dangerMain } }}
                        visible={props.source === "email"}
                    >

                        {errorEmail.message}
                    </HelperText>
                </Box>
            )}

        </Box>
    );
}

export default React.forwardRef(BaseTextInput);
