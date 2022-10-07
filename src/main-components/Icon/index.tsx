import {
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons
} from '@expo/vector-icons';
import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';

type IconType =
    | 'material'
    | 'font-awesome'
    | 'font-awesome-5'
    | 'ionicon'
    | 'material-community-icons';

export interface IconProps {
    name: string;
    color?: keyof Theme['colors'];
    size?: keyof Theme['iconSizes'];
    type?: IconType;
    style?: any;
    numberSize?: number;
}

export default function Icon({
    color = 'primaryContrastText',
    name,
    size,
    type,
    style,
    numberSize = 0
}: IconProps) {
    const theme = useTheme();
    const Icon = ({
        type,
        ...rest
    }: {
        type?: IconType;
        name: string;
        color: string;
        size: number;
        style?: any;
    }) => {
        switch (type) {
            case 'material':
                /* @ts-ignore */
                return (
                    <MaterialIcons {...rest} size={numberSize ?? rest.size} />
                );
            case 'font-awesome':
                /* @ts-ignore */
                return <FontAwesome {...rest} size={numberSize ?? rest.size} />;
            case 'font-awesome-5':
                /* @ts-ignore */
                return (
                    <FontAwesome5 {...rest} size={numberSize ?? rest.size} />
                );
            case 'ionicon':
                /* @ts-ignore */
                return <Ionicons {...rest} size={numberSize ?? rest.size} />;
            case 'material-community-icons':
                /* @ts-ignore */
                return (
                    <MaterialCommunityIcons
                        {...rest}
                        size={rest.numberSize ?? rest.size}
                    />
                );
            default:
                /* @ts-ignore */
                return (
                    <FontAwesome5
                        {...rest}
                        size={rest.numberSize ?? rest.size}
                    />
                );
        }
    };

    return (
        <Icon
            name={name}
            type={type}
            color={theme.colors[color]}
            size={size ? theme.iconSizes[size] : numberSize}
            style={style}
        />
    );
}
