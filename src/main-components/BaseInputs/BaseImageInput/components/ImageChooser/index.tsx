import ActivityIndicator from '@main-components/ActivityIndicator';
import Box from '@main-components/Box';
import Icon from '@main-components/Icon';
import List from '@main-components/List';
import ListItem from '@main-components/List/ListItem';
import Modal from '@main-components/Modal';
import Text from '@main-components/Text';
import useNotify from '@modules/_shared/domain/hooks/use-notify';
import { useTheme } from '@modules/_shared/domain/utils/constants/AppTheme';
import * as Picker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';

interface ImageChooserProps {
    isVisible?: boolean;
    onClose?: any;
    onImageSelected?: any;
}

export function ImageChooser(props: ImageChooserProps) {
    const { isVisible = false, onClose, onImageSelected } = props;
    const theme = useTheme();

    const [hasPermission, setHasPermission] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status === 'granted') {
                setHasPermission(true);
            } else {
                setHasPermission(false);
            }
        })();
    }, []);

    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        setLoading(true);
        const result = await Picker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            base64: false,
            mediaTypes: Picker.MediaTypeOptions.Images,
            quality: 0.3,
            allowsMultipleSelection: false
        });
        setLoading(false);

        if (!result.cancelled) {
            onImageSelected({
                image: result.uri,
                base64: result.base64
            });
        }
    };

    const takePhoto = async () => {
        console.log('takePhoto');
        if (hasPermission) {
            try {
                setLoading(true);
                const result = await Picker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    base64: false,
                    mediaTypes: Picker.MediaTypeOptions.Images,
                    quality: 0.3,
                    allowsMultipleSelection: false
                });
                setLoading(false);

                if (!result.cancelled) {
                    onImageSelected({
                        image: result.uri,
                        base64: result.base64
                    });
                }
            } catch (error) {
                const notify = useNotify();
                notify(`Error: ${error}`, 'error');
            }
        } else {
            setLoading(false);
            const notify = useNotify();
            notify(`Error:ERROR DE PERMISOS`, 'error');
        }
    };

    const handleOnClose = () => onClose();

    return (
        <Modal
            contentContainerStyle={{
                marginHorizontal: 10,
                padding: theme.spacing.s
            }}
            onDismiss={handleOnClose}
            visible={isVisible}
        >
            <Box justifyContent="center" height={100}>
                <List style={{ width: '100%', padding: 0 }}>
                    <ListItem
                        left={() => (
                            <Box alignItems="center" justifyContent="center">
                                <Icon
                                    type="font-awesome-5"
                                    name="image"
                                    color="secondaryMain"
                                    numberSize={25}
                                />
                            </Box>
                        )}
                        title={
                            <Text variant="body1" color="secondaryMain">
                                Seleccionar imagen
                            </Text>
                        }
                        onPress={pickImage}
                    ></ListItem>
                    <ListItem
                        left={() => (
                            <Box alignItems="center" justifyContent="center">
                                <Icon
                                    type="font-awesome-5"
                                    name="camera"
                                    color="secondaryMain"
                                    numberSize={25}
                                />
                            </Box>
                        )}
                        title={
                            <Text variant="body1" color="secondaryMain">
                                Tomar foto
                            </Text>
                        }
                        onPress={takePhoto}
                    ></ListItem>
                </List>
            </Box>
        </Modal>
    );
}
