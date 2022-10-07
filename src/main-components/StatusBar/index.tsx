import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import Constants from 'expo-constants';
import { StatusBar as BaseStatusBar } from 'expo-status-bar';
import React from 'react';

interface StatusBarProps {
    style?: any;
    color?: keyof Theme['colors'];
    translucent?: boolean;
    hidden?: boolean;
}

export default function StatusBar(props: StatusBarProps) {
    const theme = useTheme();

    return (
        <BaseStatusBar
            {...props}
            animated={false}
            backgroundColor={props.color && theme.colors[props.color]}
        />
    );
}

export const statusBarHeight = Constants.statusBarHeight;
