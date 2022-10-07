import Box from '@main-components/Box';
import Text from '@main-components/Text';
import { THEME_PRIMARY_COLOR } from 'integration/Contants';
import React from 'react';
import { Image, ImageProps, TouchableOpacity } from 'react-native';

interface ImageViewerProps {
    fullWidth?: boolean;
    image: ImageProps | JSX.Element;
    isDefaultImage?: boolean;
    onChange?: any;
    onRemove?: any;
    imageSize?: number;
    renderImage?: (url?: ImageProps) => JSX.Element;
}

const DEFAULT_IMAGE_SIZE = 150;
export function ImageViewer(props: ImageViewerProps) {
    const {
        fullWidth = true,
        image,
        renderImage,
        isDefaultImage,
        onChange,
        onRemove
    } = props;

    const renderSelectedImage = () => (
        <Box justifyContent="center" alignItems="center">
            <Box
                style={{
                    overflow: 'hidden',
                    borderRadius: DEFAULT_IMAGE_SIZE / 2,
                    width: DEFAULT_IMAGE_SIZE,
                    height: DEFAULT_IMAGE_SIZE,
                    backgroundColor: '#fafafa'
                }}
            >
                {renderImage ? (
                    renderImage(image as ImageProps)
                ) : (
                    <Image
                        source={{ uri: image }}
                        style={{
                            resizeMode: 'contain',
                            width: props.imageSize ?? DEFAULT_IMAGE_SIZE,
                            height: props.imageSize ?? DEFAULT_IMAGE_SIZE
                            // borderRadius: 9999
                        }}
                    />
                )}
            </Box>

            <Box
                flexDirection="row"
                mt="s"
                justifyContent="center"
                style={{
                    justifyContent: fullWidth ? 'center' : 'flex-start'
                }}
            >
                <TouchableOpacity onPress={onChange}>
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
                            marginRight: 5
                        }}
                    >
                        <Text color="white">Cambiar foto</Text>
                    </Box>
                </TouchableOpacity>

                <TouchableOpacity onPress={onRemove}>
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
        </Box>
    );

    const renderDefaultImage = () => (
        <Box>
            <TouchableOpacity onPress={onChange}>
                {!React.isValidElement(image) ? (
                    <Image
                        source={image as ImageProps}
                        style={{
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            width: fullWidth
                                ? '100%'
                                : props.imageSize ?? DEFAULT_IMAGE_SIZE,
                            height: props.imageSize ?? DEFAULT_IMAGE_SIZE
                        }}
                    />
                ) : (
                    image
                )}
            </TouchableOpacity>
        </Box>
    );

    return isDefaultImage ? renderDefaultImage() : renderSelectedImage();
}
