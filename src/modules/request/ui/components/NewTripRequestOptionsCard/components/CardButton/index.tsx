import Box from '@main-components/Box';
import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function CardButton({
    children,
    color,
    selected = false,
    onPress
}: {
    children: JSX.Element;
    color: keyof Theme['colors'];
    selected?: boolean;
    onPress?: any;
}) {
    const theme = useTheme();

    return (
        <TouchableOpacity
            style={{
                borderRadius: 8,
                backgroundColor: theme.colors[color],
                padding: 6,
                position: 'relative',
                height: '100%'
            }}
            onPress={onPress}
        >
            {children}

            {selected && (
                <Box
                    style={{
                        position: 'absolute',
                        bottom: 4,
                        alignSelf: 'center',
                        width: '100%',
                        paddingVertical: 1,
                        borderBottomWidth: 2,
                        borderBottomColor: theme.colors.primaryMain
                    }}
                ></Box>
            )}
        </TouchableOpacity>
    );
}
