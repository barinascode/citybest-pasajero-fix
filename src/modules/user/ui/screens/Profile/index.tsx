import React, { useEffect, useMemo, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    TextInput,
    StyleSheet,
    BackHandler,
    View,
    Image as Image2,
    ImageBackground
} from 'react-native';

import Image from '@main-components/Image';
import images from '@modules/_shared/domain/utils/constants/images';
import Box from '@main-components/Box';
import theme, {
    useTheme
} from '@modules/_shared/domain/utils/constants/AppTheme';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import { useDispatch, useSelector } from 'react-redux';
import {
    getProfileState,
    profileActions
} from 'integration/modules/Profile/store/profile.slice';
import InputPhone from 'integration/ui/InputPhone';
import { gendersList, profileAvatar } from 'Hooks/FormHooks';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import UserRepository from '@modules/user/domain/repositories/user-repository';
import useUpdateIdentity from '@modules/auth/application/hooks/use-update-identity';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { ServiceCreateWithToken } from 'Hooks/useApiService';
import ObjectUtils from '@modules/_shared/domain/utils/misc/object-utils';
import Text from '@main-components/Text';
import Button from '@main-components/Button';
import { isValidEmailString } from 'integration/shared/tools/isValidEmailString';
import InputDatePicker from 'integration/ui/InputDatePicker';
import InputGenderSelector from 'integration/ui/InputGenderSelector';
import BaseImageInputProfile from '@main-components/BaseInputs/BaseImageInput/BaseInputProfile';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import { position } from '@shopify/restyle';

export default function Profile() {
    
    const theme = useTheme();
    const { data: user, loading } = useGetProfile();
    const dispatch = useDispatch();
    const profileState = useSelector(getProfileState);

    const [formState, setformState] = useState<any>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
        iso2: '',
        profilePictureUrl: ''
    });

    const [imageProfile, setimageProfile] = useState(user?.profilePictureUrl);
    const userRepo = useRepository<UserRepository>('UserRepository');
    const notify = useNotify();
    const { update: updateIdentity, loading: savingIdentity } =
        useUpdateIdentity();
    const [buttonStateUpdate, setbuttonStateUpdate] = useState({
        disabled: false,
        message: 'Actualizar Perfil',
        loading: false
    });

    const [formErrors, setformErrors] = useState<any>([]);
    const [isUpdated, setisUpdated] = useState(false);

    const RenderError = (fieldSearch: string) => {
        return formErrors.filter((input: any) => input.field == fieldSearch)[0];
    };

    const onFinish = () => {
        setisUpdated(true);
        setbuttonStateUpdate({
            disabled: true,
            message: 'Actualizando...',
            loading: true
        });

        userRepo.GetTokenUser().then((token: any) => {
            let data = formState;
            data.profilePictureUrl = imageProfile;
            ServiceCreateWithToken(
                data,
                'passengers/profile/update',
                token
            ).then((res) => {
                if (res.ok === false && res.error == 'email already exist') {
                    notify('El correo ya se encuentra registrado', 'warning');
                } else if (
                    res.ok === false &&
                    res.error == 'phone already exist'
                ) {
                    notify(
                        'El numero de telefono ya se encuentra registrado',
                        'warning'
                    );
                } else {
                    updateIdentity({
                        ...ObjectUtils.omit(data, ['profilePictureUrl']),
                        ...(imageProfile !== null
                            ? {
                                  profilePictureUrl: imageProfile
                              }
                            : {}),
                        credentials: {
                            email: formState.email,
                            password: formState.password,
                            phone: formState.phone
                        }
                    });
                    notify('Perfil Actualizado', 'success');
                    dispatch(
                        profileActions.setProfileState({
                            ...profileState,
                            ...data,
                            iso2Country: formState.iso2,
                            phoneNumber: formState.phone,
                            phonePrefix: formState.prefix
                        })
                    );
                }
                setisUpdated(false);
                setbuttonStateUpdate({
                    disabled: false,
                    message: 'Actualizar Perfil',
                    loading: false
                });
            });
        });
    };

    useEffect(() => {
        if (!isUpdated) {
            if (user?.prefix) {
                setformState({
                    firstName: user?.firstName ?? user?.firstName,
                    lastName: user?.lastName,
                    profilePictureUrl: user?.profilePictureUrl ?? profileAvatar,
                    email: user?.email,
                    phone: user?.phone,
                    iso2: user?.iso2,
                    prefix: user?.prefix,
                    birthday: user?.birthday,
                    gender: user?.gender
                });
            }
        }
        setimageProfile(user?.profilePictureUrl);
    }, [user]);

    const EmailValidator = (value: string, key: string) => {
        if (value.length === 0) {
            setformErrors([
                ...formErrors,
                {
                    field: key,
                    status: true,
                    message: 'Ingrese este campo por favor'
                }
            ]);
        } else {
            if (!isValidEmailString(value)) {
                setformErrors([
                    ...formErrors,
                    {
                        field: key,
                        status: true,
                        message: 'El email no es valido'
                    }
                ]);
            } else if (value !== '' && isValidEmailString(value)) {
                let temp = formErrors.filter((item: any) => item.field !== key);
                setformErrors(temp);
            }
        }
    };

    const GeneralFormValidations = (key: any, value: any) => {
        if (key === 'email') {
            EmailValidator(value, key);
            return;
        } else if (key === 'phone') {
            return;
        } else if (value === '') {
            setformErrors([
                ...formErrors,
                {
                    field: key,
                    status: true,
                    message: 'Ingrese este campo por favor'
                }
            ]);
        } else if (value !== '') {
            let temp = formErrors.filter((item: any) => item.field !== key);
            setformErrors(temp);
        }
    };

    const handleChangeFormState = (field: any) => {
        setformState({
            ...formState,
            [field.name]: field.value
        });
        GeneralFormValidations(field.name, field.value);
    };

    const PhoneValidator = (phoneNumber: any) => {
        let { prefix, iso2, phone } = phoneNumber;

        if (phone === '' || prefix === '' || iso2 === '') {
            setformErrors([
                ...formErrors,
                {
                    field: 'phone',
                    status: true,
                    message: 'Ingrese este campo por favor'
                }
            ]);
        } else {
            if (phone.length < 9) {
                setformErrors([
                    ...formErrors,
                    {
                        field: 'phone',
                        status: true,
                        message: 'este campo debe tener minimo 9 digitos'
                    }
                ]);
            } else if (phone.length > 14) {
                setformErrors([
                    ...formErrors,
                    {
                        field: 'phone',
                        status: true,
                        message: 'este campo debe tener maximo 14 digitos'
                    }
                ]);
            }

            if (
                phone !== '' &&
                prefix !== '' &&
                iso2 !== '' &&
                phone.length >= 9 &&
                phone.length <= 14
            ) {
                let temp = formErrors.filter(
                    (item: any) => item.field !== 'phone'
                );
                setformErrors(temp);
            }
        }
    };

    useMemo(() => {
        if (formErrors.length > 0) {
            setbuttonStateUpdate({
                disabled: true,
                message: 'Ingresa todos los campos',
                loading: false
            });
        } else {
            setbuttonStateUpdate({
                disabled: false,
                message: 'Actualizar Perfil',
                loading: false
            });
        }
    }, [formErrors]);

    useEffect(() => {
        const backAction: any = () => {
            // console.log('backAction', profileState);
            if (isUpdated) {
                setformState({
                    firstName: profileState.firstName,
                    lastName: profileState.lastName,
                    profilePictureUrl: profileState.profilePictureUrl,
                    email: profileState.email,
                    phone: profileState.phoneNumber,
                    iso2: profileState.iso2Country,
                    prefix: profileState.phonePrefix,
                    birthday: profileState.birthday,
                    gender: profileState?.gender
                });
            } else {
                setformState({
                    firstName: user?.firstName ?? user?.firstName,
                    lastName: user?.lastName,
                    profilePictureUrl:
                        user?.profilePictureUrl &&
                        user?.profilePictureUrl !== ''
                            ? user?.profilePictureUrl
                            : profileAvatar,
                    email: user?.email,
                    phone: user?.phone,
                    iso2: user?.iso2,
                    prefix: user?.prefix,
                    birthday: user?.birthday,
                    gender: user?.gender
                });
            }
            // setimageProfile(user?.profilePictureUrl);
            setformErrors([]);
        };

        let handlerBack = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );
        return () => {
            handlerBack.remove();
        };
    }, [profileState]);

    return (
        <SafeAreaView
            style={{ backgroundColor: theme.colors.greyMedium, flex: 1 }}
        >
            <ScrollView
                style={{
                    backgroundColor: 'white'
                    // backgroundColor: 'orange'
                }}
            >
                

                <ProfileScreenHeader />

                <ImageBackground
                source={images.CRESPA_SOLA}
                resizeMode="cover"
                style={{ flex: 1,
                    justifyContent: "center",
                    height : 300,
                    // backgroundColor : 'red',
                    // margin : 10,
                    // borderColor : 'red',
                    // borderWidth : 5
                }}
                >       
                </ImageBackground>

                        <View style={{
                            position : 'relative',
                            top : -100,
                            // backgroundColor : 'red',
                            height : 250
                            // overflow : 'hidden',
                        }}>
                        <BaseImageInputProfile
                                onChange={(image: any) => {
                                setimageProfile(image);
                            }}
                            isUpdated={isUpdated}
                            />
                        </View>

                <Box  padding="m" style={{
                    // backgroundColor : 'blue',
                    position : 'relative',
                    top : -100
                    }}>

                    <Box
                        bg="white"
                        style={{
                            borderRadius: 10,
                            flexDirection: 'row',
                            marginBottom: 0
                        }}
                    >
                        <Box
                            style={{
                                justifyContent: 'space-between',
                                margin: 4,
                                marginRight: 10
                            }}
                        >
                            <Image
                                source={images.USUARIO}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </Box>

                        <Box
                            style={{
                                justifyContent: 'space-between',
                                width: '88%'
                            }}
                        >
                            <TextInputImplementation
                                source="firstName"
                                label="nombre"
                                formState={formState}
                                handleChangeFormState={handleChangeFormState}
                                error={RenderError('firstName')}
                            />
                        </Box>
                    </Box>

                    <Box
                        bg="white"
                        style={{
                            marginTop: 20,
                            borderRadius: 10,
                            flexDirection: 'row'
                        }}
                        // flex={1}
                    >
                        <Box
                            style={{
                                justifyContent: 'space-between',
                                margin: 4,
                                marginRight: 10
                            }}
                        >
                            <Image
                                source={images.USUARIO}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </Box>

                        <Box
                            style={{
                                justifyContent: 'space-between',
                                width: '88%'
                            }}
                        >
                            <TextInputImplementation
                                source="lastName"
                                label="apellido"
                                formState={formState}
                                handleChangeFormState={handleChangeFormState}
                                error={RenderError('lastName')}
                            />
                        </Box>
                    </Box>

                    {/*EMAIL INPUT*/}
                    <Box
                        bg="white"
                        style={{
                            marginTop: 20,
                            borderRadius: 10,
                            flexDirection: 'row'
                        }}
                        // flex={1}
                    >
                        <Box
                            style={{
                                justifyContent: 'space-between',
                                margin: 4,
                                marginRight: 10
                            }}
                        >
                            <Image
                                source={images.EMAILICON}
                                style={{
                                    resizeMode: 'contain',
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </Box>

                        <Box
                            style={{
                                justifyContent: 'space-between',
                                width: '88%'
                            }}
                        >
                            <TextInputImplementation
                                source="email"
                                label="correo"
                                formState={formState}
                                handleChangeFormState={handleChangeFormState}
                                error={RenderError('email')}
                            />
                        </Box>
                    </Box>
                    {/*EMAIL INPUT*/}

                    <Box
                        style={{
                            marginTop: 20,
                            borderRadius: 10,
                            width: '100%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <InputPhone
                            onChangeHandler={(payload: any) => {
                                setformState({
                                    ...formState,
                                    phone: payload.phone,
                                    iso2: payload.iso2,
                                    prefix: payload.prefix
                                });
                                PhoneValidator(payload);
                            }}
                            iso2={formState.iso2}
                            prefix={formState.prefix}
                            phone={formState?.phone}
                            error={RenderError('phone')}
                        />
                        {RenderError('phone')?.status && (
                            <Text
                                style={{
                                    color: 'red',
                                    marginTop: 5,
                                    marginLeft: 50,
                                    marginBottom: 0
                                }}
                            >
                                {RenderError('phone')?.message}
                            </Text>
                        )}
                    </Box>

                    <Box
                        bg="white"
                        style={{
                            marginTop: 20,
                            borderRadius: 10,
                            flexDirection: 'row'
                        }}
                    >
                        <InputDatePicker
                            onConfirm={(birthday) => {
                                handleChangeFormState({
                                    name: 'birthday',
                                    value: birthday
                                });
                            }}
                            selectedDate={formState.birthday}
                        />
                    </Box>

                    <Box
                        bg="white"
                        style={{
                            marginTop: 20,
                            borderRadius: 10,
                            width: '100%',
                            justifyContent: 'space-between'
                        }}
                    >
                        <InputGenderSelector
                            onConfirm={(gender) => {
                                handleChangeFormState({
                                    name: 'gender',
                                    value: gender
                                });
                            }}
                            genderList={gendersList}
                            selectedGender={formState.gender}
                        />
                    </Box>

                    <Box mt="m">
                        <Button
                            onPress={() => {
                                // props.preSubmitHandler && props.preSubmitHandler()
                                // handleSubmit(props.onSubmit)();
                                onFinish();
                            }}
                            disabled={buttonStateUpdate.disabled}
                            uppercase={false}
                            title={buttonStateUpdate.message}
                            loading={buttonStateUpdate.loading}
                        />
                    </Box>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}

function ProfileScreenHeader() {
    const HEIGHT = 120;
    return (
        

       <>

    <View style={{
                backgroundColor : THEME_PRIMARY_COLOR,
                paddingVertical : 10,
                justifyContent : 'center',
                alignItems : 'center',
                flexDirection : 'row'
            }}> 
                  
                <Text style={{marginLeft : 4,color : 'white', fontWeight : 'bold', marginTop : 20}}>Viajes 100% vehículos eléctricos</Text>
                <Image2
                        source={images.HOJAS_SOLAS}
                        style={{
                            width : 22,
                            height : 22,
                            position : 'relative',
                            top : 0,
                            left : -10
                        }}
                    />
            </View>

                        
     
       </> 
    );
}

const styles = StyleSheet.create({
    inputClass: {
        height: 40,
        // margin: 5,
        borderWidth: 1,
        padding: 10,
        borderColor: theme.colors.primaryMain,
        borderRadius: 9999,
        fontSize: 16.5,
        fontFamily: theme.textVariants.inputLabel.fontFamily
    },
    inputClassError: {
        height: 40,
        padding: 10,
        borderRadius: 9999,
        fontSize: 16.5,
        fontFamily: theme.textVariants.inputLabel.fontFamily,
        borderColor: 'red',
        borderWidth: 1
    },
    buttonSubmit: {
        backgroundColor: theme.colors.primaryMain,
        height: 40,
        width: '100%',
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    textSubmit: {
        color: 'white',
        fontSize: 16,
        padding: 10,
        fontFamily: 'ptsans-regular'
    }
});

export const TextInputImplementation = ({
    source = '',
    formState,
    handleChangeFormState,
    error,
    label = ''
}) => {
    return (
        <Box>
            <TextInput
                onChange={(text) => {
                    text.preventDefault();
                }}
                onChangeText={(text) => {
                    handleChangeFormState({
                        name: source,
                        value: text
                    });
                }}
                placeholder={`Ingrese su ${label}`}
                style={error ? styles.inputClassError : styles.inputClass}
                value={formState[source]}
            />
            {error?.status && (
                <Text
                    style={{
                        color: 'red',
                        marginTop: 5,
                        marginLeft: 10,
                        marginBottom: 0
                    }}
                >
                    {error?.message}
                </Text>
            )}
        </Box>
    );
};
