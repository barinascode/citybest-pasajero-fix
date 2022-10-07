import { useTheme } from '@shared/domain/utils/constants/AppTheme';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import HTML from 'react-native-render-html';

interface HTMLViewerProps {
    html: string;
    style?: any;
    baseFontStyle?: any;
}

export default function HTMLViewer(props: HTMLViewerProps) {
    const contentWidth = useWindowDimensions().width;
    const theme = useTheme();

    return (
        <HTML
            source={{ html: props.html }}
            baseFontStyle={
                props.baseFontStyle || {
                    lineHeight: 22,
                    color: theme.colors.greyMain,
                    fontFamily: theme.textVariants.body1.fontFamily
                }
            }
            contentWidth={contentWidth}
        />
    );
}
