import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import {
    Image as BaseImage,
    ImageProps as BaseImageProps
} from 'react-native-elements';
// import { CacheManager, Image as FImage } from "react-native-expo-image-cache";

type ImageProps = BaseImageProps & {
    showPlaceHolder?: boolean;
    elevation?: number;
};

function Image({ showPlaceHolder = true, ...props }: ImageProps) {
    const theme = useTheme();
    return (
        <BaseImage
            {...props}
            transition={false}
            placeholderStyle={{
                backgroundColor: showPlaceHolder
                    ? theme.colors.greyLight
                    : 'transparent'
            }}
            progressiveRenderingEnabled
        />
    );
}

export default Image;
