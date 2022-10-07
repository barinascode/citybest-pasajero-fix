import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { ActivityIndicatorProps as BaseActivityIndicatorProps } from 'react-native';
import { ActivityIndicator as BaseActivityIndicator } from 'react-native-paper';

interface ActivityIndicatorProps
    extends Omit<BaseActivityIndicatorProps, 'color'> {
    color?: keyof Theme['colors'];
}

export default function ActivityIndicator(props: ActivityIndicatorProps) {
    const theme = useTheme();

    return (
        <BaseActivityIndicator
            size={20}
            {...props}
            color={theme.colors[props.color ?? 'primaryMain']}
        />
    );
}
