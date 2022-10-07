import AppIcon from '@main-components/AppIcon';
import Box from '@main-components/Box';
import { Form } from '@main-components/Form';
import ImageInput from '@main-components/Form/inputs/ImageInput';
import PhoneTextInput from '@main-components/Form/inputs/PhoneTextInput';
import TextInput from '@main-components/Form/inputs/TextInput';
import SaveButton from '@main-components/Form/SaveButton';
import Image from '@main-components/Image';
import StatusBar from '@main-components/StatusBar';
import useGetIdentity from '@modules/auth/application/hooks/use-get-identity';
import useUpdateIdentity from '@modules/auth/application/hooks/use-update-identity';
import useSaveProfile from '@modules/user/application/hooks/use-save-profile';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import images from '@modules/_shared/domain/utils/constants/images';
import { onlyLetters } from '@shared/form/filters';
import { minLength, required } from '@shared/form/validate';
import { AppCountries } from 'config/Countries/data/AppCountries';

import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PHONE_MIN_LENGTH } from '../Login/components/LoginWizardForm';

export default function CompleteRegistration() {
    const theme = useTheme();
    const { save, loading: savingProfile } = useSaveProfile({
        notifyOnSucceed: false
    });

    const { identity: user, loading } = useGetIdentity();
    const { update, loading: savingIdentity } = useUpdateIdentity();
    const saving = savingProfile || savingIdentity;

    const imageSize = 200;

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <StatusBar />
            <ScrollView keyboardShouldPersistTaps="always">
                <Box bg="white" style={{ marginTop: 40 }} flex={1} padding="m">
                    <Form
                        onSubmit={() => {}}
                        toolbar={
                            <FormToolbar
                                saving={saving}
                                save={async (values:any) => {
                                    await save({
                                        ...values,
                                        id: user?.id
                                    });
                                    await update({
                                        ...values
                                    });
                                }}
                            />
                        }
                        defaultValues={{
                            firstName: user?.firstName,
                            lastName: user?.lastName,
                            profilePictureUrl: user?.profilePictureUrl
                        }}
                    >
                        <Box
                            justifyContent="center"
                            alignItems="center"
                            width={imageSize}
                            height={250}
                            marginBottom="m"
                            alignSelf="center"
                        >
                            <ImageInput
                                source="profilePictureUrl"
                                renderImage={(url) => (
                                    <Box
                                        position="relative"
                                        width={imageSize}
                                        height={imageSize}
                                        flex={0}
                                        borderRadius={imageSize / 2}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Image
                                            source={{ uri: url }}
                                            style={{
                                                resizeMode: 'cover',
                                                height: imageSize,
                                                width: imageSize,
                                                borderRadius: imageSize / 2
                                            }}
                                        />
                                    </Box>
                                )}
                                defaultImage={
                                    <Box
                                        position="relative"
                                        width={imageSize}
                                        height={imageSize}
                                        flex={0}
                                        borderRadius={imageSize / 100}
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <Image
                                            source={images.DEFAULT_PHOTO}
                                            style={{
                                                resizeMode: 'contain',
                                                height: imageSize,
                                                width: imageSize
                                            }}
                                        />
                                        <Box
                                            width={60}
                                            height={60}
                                            bg="primaryMain"
                                            position="absolute"
                                            right={-5}
                                            bottom={-0}
                                            justifyContent="center"
                                            alignItems="center"
                                            borderRadius={30}
                                        >
                                            <AppIcon
                                                name="camera"
                                                size={30}
                                                color={theme.colors.white}
                                            />
                                        </Box>
                                    </Box>
                                }
                                fullWidth={false}
                                imageSize={imageSize}
                            />
                        </Box>

                        <TextInput
                            source="firstName"
                            leftIcon={{
                                name: 'user',
                                size: 'm',
                                color: 'primaryMain'
                            }}
                            filterText={onlyLetters}
                            placeholder="Ingresa tu nombre"
                            validate={required()}
                            mode="outlined"
                            autoFocus={true}
                        />

                        <TextInput
                            source="lastName"
                            leftIcon={{
                                name: 'user',
                                size: 'm',
                                color: 'primaryMain'
                            }}
                            filterText={onlyLetters}
                            placeholder="Ingresa tu apellido"
                            validate={required()}
                            mode="outlined"
                        />

                        <PhoneTextInput
                            source="phone"
                            placeholder="Ej. 0424000000"
                            mode="outlined"
                            validate={[
                                required('Ingresa tu número de teléfono'),
                                minLength(
                                    PHONE_MIN_LENGTH,
                                    `Tu teléfono debe contener al menos ${PHONE_MIN_LENGTH} números`
                                )
                            ]}
                            defaultCountryCode={'CO'}
                            countryCodes={AppCountries}
                        />
                    </Form>
                </Box>
            </ScrollView>
        </SafeAreaView>
    );
}

function FormToolbar(props: any) {
    return (
        <Box mt="m">
            <SaveButton
                label="Continuar"
                uppercase={false}
                loading={props.saving}
                onSubmit={async (data) => {
                    const credentials = {
                        password: data.password,
                        cpassword: data.cpassword,
                        email: data.email
                    };
                    props.save({
                        ...data,
                        credentials: credentials
                    });
                }}
            />
        </Box>
    );
}
