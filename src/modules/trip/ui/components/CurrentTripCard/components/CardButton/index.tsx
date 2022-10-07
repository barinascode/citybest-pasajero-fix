import {
    Theme,
    useTheme
} from '@modules/_shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export function CardButton({
    children,
    color,
    onPress
}: {
    children: JSX.Element;
    color: keyof Theme['colors'];
    onPress?: any;
}) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={{
                borderColor: theme.colors.greyLight2,
                borderRadius: 5,
                backgroundColor: theme.colors[color],
                padding: 5,
                height: '100%',
                shadowColor:"#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,

            }}
            onPress={onPress}
        >
            {children}
        </TouchableOpacity>
    );
}
