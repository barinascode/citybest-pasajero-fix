import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { GestureResponderEvent, TouchableOpacity } from 'react-native';
import Box from './../Box';
import Icon, { IconProps } from './../Icon';

interface IconButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    text?: string;
    backgroundColor?: keyof Theme['colors'];
    iconColor?: keyof Theme['colors'];
    borderRadius?: number;
    iconName: IconProps['name'];
    iconType?: IconProps['type'];
    size?: number;
    containerSize?: number;
}

export default function IconButton({
    onPress,
    borderRadius,
    size = 30,
    iconName,
    iconType,
    backgroundColor,
    iconColor,
    containerSize
}: IconButtonProps) {
    const theme = useTheme();

    return (
        <TouchableOpacity onPress={onPress}>
            <Box
                padding="s"
                justifyContent="center"
                alignItems="center"
                width={containerSize}
                height={containerSize}
                borderRadius={borderRadius}
                backgroundColor={backgroundColor}
            >
                <Icon
                    name={iconName}
                    color={iconColor}
                    type={iconType}
                    numberSize={size}
                />
            </Box>
        </TouchableOpacity>
    );
}
