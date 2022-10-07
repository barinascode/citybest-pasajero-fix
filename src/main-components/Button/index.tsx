import { Theme, useTheme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
/* import { Button as BaseButton, IconNode } from "react-native-elements"; */
import { Button as BaseButton } from 'react-native-paper';

export interface ButtonProps {
    onPress: () => any;
    title?: string;
    backgroundColor?: keyof Theme['colors'];
    titleColor?: keyof Theme['colors'];
    borderRadius?: keyof Theme['borderRadius'];
    size?: keyof Theme['buttonSizes'];
    loading?: boolean;
    icon?: any;
    raised?: boolean;
    block?: boolean;
    style?: any;
    mode?: 'contained' | 'outlined' | 'text' | 'action';
    disabled?: boolean;
    uppercase?: boolean;
    compact?: boolean;
    labelStyle?: any;
    rounded?: boolean;
}

export default function Button({
    onPress,
    title,
    borderRadius = 's',
    size = 'l',
    titleColor = 'primaryContrastText',
    loading = false,
    backgroundColor = 'primaryMain',
    icon,
    raised = false,
    block = false,
    style,
    labelStyle: customLabelStyle = {},
    mode = 'contained',
    disabled = false,
    uppercase = true,
    compact = false,
    rounded = true
}: ButtonProps) {
    const theme = useTheme();

    const shouldDisable = disabled || loading;

    const contentStyle = [
        {
            padding: 8
        },
        {
            width: block ? '100%' : undefined,
            borderRadius: borderRadius ? theme.borderRadius[borderRadius] : 0
        }
    ];

    const finalBackgroundColor = disabled
        ? mode !== 'text'
            ? theme.colors[backgroundColor]
            : 'transparent'
        : mode == 'text'
        ? 'transparent'
        : mode == 'contained'
        ? theme.colors[backgroundColor]
        : 'transparent';

    // const finalBackgroundColor = disabled
    //     ? 'grey' : theme.colors[backgroundColor];

    const buttonStyle = [
        style,
        {
            elevation: mode == 'contained' && raised ? 20 : undefined,
            borderRadius: mode !== 'text' ? (rounded ? 30 : 8) : undefined,
            backgroundColor: finalBackgroundColor,
            boxShadow: mode === 'text' ? 'none' : undefined,
            //  border: '5rem solid red'
            ...(mode == 'outlined' && {
                borderWidth: 1,
                borderColor: theme.colors[backgroundColor]
            })
        }
    ];

    const labelStyle = {
        color:
            mode == 'contained'
                ? theme.colors[titleColor]
                : mode == 'text'
                    ? theme.colors[titleColor] || theme.colors[backgroundColor]
                    : theme.colors[titleColor] || theme.colors[backgroundColor],
        marginLeft: icon ? 12 : undefined,
        fontSize: theme.textVariants.button.fontSize,
        textTransform: uppercase ? 'uppercase' : undefined,
        lineHeight: theme.textVariants.button.lineHeight,
        ...customLabelStyle
    };

    return (
        <BaseButton
            loading={loading}
            onPress={onPress}
            mode={mode !== 'action' ? mode : 'contained'}
            disabled={shouldDisable}
            color={theme.colors[backgroundColor]}
            compact={compact}
            contentStyle={contentStyle}
            style={buttonStyle}
            labelStyle={{ ...labelStyle }}
            icon={icon}
            theme={{
                fonts: {
                    thin: {
                        fontFamily: theme.textVariants.body.fontFamily
                    },
                    medium: {
                        fontFamily: theme.textVariants.body.fontFamily
                    },
                    regular: {
                        fontFamily: theme.textVariants.body.fontFamily
                    },
                    light: {
                        fontFamily: theme.textVariants.body.fontFamily
                    }
                }
            }}
        >
            {title}
        </BaseButton>
    );
}
