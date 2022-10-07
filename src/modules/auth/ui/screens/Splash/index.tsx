import Box from '@main-components/Box';
import useDimensions from '@modules/_shared/domain/utils/hooks/useDimensions';
import images from '@shared/domain/utils/constants/images';
import React from 'react';
import { Image } from 'react-native';

interface SplashProps {
    title?: string;
    actions?: any;
}

export default function Splash({ title, actions }: SplashProps) {
    const { height, width } = useDimensions();
    return (
        <Box>
            <Image
                style={{
                    width: width,
                    height: height
                }}
                resizeMode="cover"
                source={images.SPLASH_2}
            />
        </Box>
    );
}
