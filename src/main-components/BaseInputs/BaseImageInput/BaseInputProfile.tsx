import Box from '@main-components/Box';
import React, { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    BackHandler,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { ImageChooser } from './components/ImageChooser';
import { useUploadImage } from 'Hooks/useUploadImage';
import { profileAvatar } from 'Hooks/FormHooks';
import Text from '@main-components/Text';
import useGetProfile from '@modules/user/application/hooks/use-get-profile';
import { useSelector } from 'react-redux';
import { getProfileState } from 'integration/modules/Profile/store/profile.slice';
import { useNavigation } from '@react-navigation/native';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import UserRepository from '@modules/user/domain/repositories/user-repository';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import images from '@modules/_shared/domain/utils/constants/images';
import {Image as Image2} from 'react-native'
const DEFAULT_IMAGE_SIZE = 150;

export interface BaseImageInputProps {
    onChange?: any;
    UploadingImage?: (status: boolean, url: string) => void;
    isUpdated?: boolean;
}

export default function BaseImageInputProfile(props: BaseImageInputProps) {
    const { isUpdated, UploadingImage, onChange } = props;
    const profileState = useSelector(getProfileState);
    const { data: user } = useGetProfile();
    let [imageProfile, setimageProfile] = useState(profileAvatar);
    const [showImageChooser, setshowImageChooser] = useState(false);
    const [loadingImage, setloadingImage] = useState(false);
    const navigation = useNavigation();
    const userRepo = useRepository<UserRepository>('UserRepository');

    useEffect(() => {
        navigation.addListener('focus', () => {
            if (navigation.isFocused()) {
                setloadingImage(true);
                userRepo.getProfile().then((user) => {
                    console.log('user al llegar', user);
                    setimageProfile(user.profilePictureUrl);
                    setloadingImage(false);
                });
            }
        });
    }, [navigation]);

    const onImageSelected = ({ image: selectedImage, base64 }: any) => {
        setshowImageChooser(false);
        setloadingImage(true);
        UploadingImage && UploadingImage(true, '');
        fetch(selectedImage)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], `ImageProfile${Date.now()}`, {
                    type: 'image/png'
                });
                useUploadImage(file).then((url: any) => {
                    // UploadingImage && UploadingImage(false, url);
                    onChange(url);
                    setimageProfile(url);
                    setloadingImage(false);
                });
            });
    };

    const onRemoveImage = () => {
        setimageProfile(profileAvatar);
        onChange(profileAvatar);
    };

    useMemo(() => {
        BackHandler.addEventListener('hardwareBackPress', (): any => {
            if (!isUpdated) {
                setimageProfile(imageProfile);
            } else {
                if (profileState.profilePictureUrl) {
                    setimageProfile(profileState.profilePictureUrl);
                } else if (user?.profilePictureUrl) {
                    setimageProfile(user.profilePictureUrl);
                }
            }
        });
    }, []);

    // console.log('holamundillo: ', imageProfile)
// console.log(imageProfile)


    const FotoPerfil = (foto:any)=>{

            if(!foto)
                return  <Image2
                        source={images.DEFAULT_PHOTO}
                        style={{ 
                            width: 160,
                            height: 160,
                            borderRadius : 100,
                            resizeMode : 'cover',
                            borderColor : '#36d98f',
                            borderWidth :6
                        }}
                    />

                return <Image2
                    source={(imageProfile) ? {uri:foto } :  images.CIRCULO_SOLO}
                    style={{ 
                        width: 160,
                        height: 160,
                        borderRadius : 100,
                        resizeMode : 'cover',
                        borderColor : '#36d98f',
                        borderWidth :6
                    }}
                />
    }


    return (

        

        <Box justifyContent="center" alignItems="center"  
        style={{
            // backgroundColor : 'grey'
        }}>
            <Box
                style={{
                    borderRadius: DEFAULT_IMAGE_SIZE / 2,
                    width: DEFAULT_IMAGE_SIZE,
                    height: DEFAULT_IMAGE_SIZE,
                    // backgroundColor: 'yellow',
                    justifyContent : 'center',
                    alignItems : 'center'
                }}
            >
                {loadingImage ? (
                    <Box
                        style={[
                            stylesLoading.container,
                            stylesLoading.horizontal
                        ]}
                    >
                        <ActivityIndicator size="large" color={THEME_PRIMARY_COLOR} />
                    </Box>
                ) : (
                    FotoPerfil(imageProfile)
                )}
            </Box>

            <Box
                flexDirection="row"
                mt="s"
               
                style={{
                    justifyContent: 'center',
                    top :30,
                    // backgroundColor : 'green',
                    position:'relative'
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        setshowImageChooser(true);
                    }}
                >
                    <Box
                        p="m"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="primaryMain"
                        borderRadius={25}
                        paddingHorizontal="l"
                        style={{
                            backgroundColor: THEME_PRIMARY_COLOR,
                            borderColor: '#45237B',
                            borderWidth: 1,
                            marginRight: 5,
                            zIndex : 9999999
                        }}
                    >
                        <Text color="white">Cambiar foto</Text>
                    </Box>
                </TouchableOpacity>

                <TouchableOpacity onPress={onRemoveImage}>
                    <Box
                        p="m"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor="primaryMain"
                        borderRadius={25}
                        paddingHorizontal="l"
                        style={{
                            backgroundColor: THEME_PRIMARY_COLOR,
                            borderColor: '#45237B',
                            borderWidth: 1.5,
                            marginRight: 5
                        }}
                    >
                        <Text color="white">Quitar foto</Text>
                    </Box>
                </TouchableOpacity>
            </Box>

            <ImageChooser
                isVisible={showImageChooser}
                onImageSelected={onImageSelected}
                onClose={() => {
                    setshowImageChooser(!showImageChooser);
                }}
            />
        </Box>
    );
}

const stylesLoading = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});
