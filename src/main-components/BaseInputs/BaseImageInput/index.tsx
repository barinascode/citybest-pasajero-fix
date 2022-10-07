import Box from '@main-components/Box';
import InputLabel from '@main-components/Form/InputLabel';
import InputTextHelper from '@main-components/Form/InputTextHelper';
import React, { useState } from 'react';
import { ImageProps } from 'react-native';
import { ImageChooser } from './components/ImageChooser';
import { ImageViewer } from './components/ImageViewer';
import { useUploadImage } from 'Hooks/useUploadImage';

export interface BaseImageInputProps {
    onChange?: any;
    defaultImage: any;
    initialImage?: any;
    fullWidth?: boolean;
    error?: string;
    label?: any;
    helperText?: string;
    imageSize?: number;
    renderImage?: (url?: ImageProps) => JSX.Element;
    UploadingImage?: (status: boolean, url: string) => void
}

export default function BaseImageInput(props: BaseImageInputProps) {
    const {
        onChange,
        initialImage,
        renderImage,
        defaultImage,
        fullWidth = true,
        UploadingImage
    } = props;

    const [image, setImage] = useState(null);
    const [showImageChooser, setShowImageChooser] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const toggleImageChooser = () => {
        setShowImageChooser(!showImageChooser);
    };

    const onImageSelected = ({ image: selectedImage, base64 }: any) => {
        setShowImageChooser(false);
        setIsDeleted(false);
        setImage(selectedImage);
        UploadingImage && UploadingImage(true, '')
        fetch(selectedImage)
            .then((res) => res.blob())
            .then((blob) => {
                const file = new File([blob], `ImageProfile${Date.now()}`, { type: "image/png" });
                useUploadImage(file).then((url: any) => {
                    UploadingImage && UploadingImage(false, url)
                    onChange(url);
                });
                // CompressorImage(file).then((res) => {
                // console.log("🚀 ~ file: index.tsx ~ line 57 ~ CompressorImage ~ res", res)
                // }).catch((err) => {
                //     console.log("🚀 ~ file: index.tsx ~ line 57 ~ CompressorImage ~ err", err)
                // })

            });
    };

    const onRemoveImage = () => {
        setImage(null);
        setIsDeleted(true);
        onChange && onChange(null);
    };

    // const CompressorImage = async (file: any) => new Promise((resolve, reject) => {
    //     new Compressor(file, {
    //         quality: 0.6,
    //         success(result: any) {
    //             console.log("🚀 ~ file: index.tsx ~ line 58 ~ success ~ result", result)
    //             const formData = new FormData();
    //             formData.append('file', result, result.name);
    //             resolve(formData);

    //         },
    //         error(err) {
    //             reject(err.message);
    //         },
    //     });

    // })

    const imageToShow = isDeleted
        ? defaultImage
        : image || initialImage || defaultImage;
    const isDefaultImage = isDeleted ? true : !image && !initialImage;

    return React.useMemo(
        () => (
            <Box>
                <InputLabel label={props.label} hasError={!!props.error} />
                <Box flexDirection="column" justifyContent="center">
                    <ImageViewer
                        isDefaultImage={isDefaultImage}
                        image={imageToShow}
                        renderImage={
                            renderImage ? (url) => renderImage(url) : undefined
                        }
                        onChange={toggleImageChooser}
                        onRemove={onRemoveImage}
                        fullWidth={fullWidth}
                        imageSize={props.imageSize}
                    />

                    <ImageChooser
                        isVisible={showImageChooser}
                        onImageSelected={onImageSelected}
                        onClose={toggleImageChooser}
                    />
                </Box>

                <InputTextHelper
                    error={props.error}
                    helperText={props.helperText}
                />
            </Box>
        ),
        [imageToShow, isDefaultImage, showImageChooser]
    );
}