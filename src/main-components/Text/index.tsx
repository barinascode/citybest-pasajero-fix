import { BaseText, Theme } from '@shared/domain/utils/constants/AppTheme';
import React from 'react';
import { TextProps as BaseTextProps } from 'react-native';

export interface TextProps extends BaseTextProps {
    color?: keyof Theme['colors'];
    variant?: keyof Theme['textVariants'];
    children?: React.ReactNode | string;
    note?: boolean;
    bold?: boolean;
    uppercase?: boolean;
    align?: 'auto' | 'center' | 'justify' | 'left' | 'right';
    numberOfLines?: number;
}

const defaultProps: Partial<TextProps> = {
    variant: 'body1',
    note: false,
    bold: false,
    uppercase: false
};

export default function Text(props: TextProps) {
    return (
        <BaseText
            {...{ ...defaultProps, ...props }}
            fontWeight={props.bold ? 'bold' : undefined}
            textTransform={props.uppercase ? 'uppercase' : undefined}
            color={props.note ? 'textNoteColor' : props.color}
            textAlign={props.align}
            numberOfLines={props.numberOfLines}
        />
    );
}
