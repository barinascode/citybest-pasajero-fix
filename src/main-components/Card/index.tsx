import Box from '@main-components/Box';
import React from 'react';
import { ImageProps, View } from 'react-native';
import { Card as BaseCard } from 'react-native-paper';

export interface CardProps {
    children: React.ReactNode;
    elevation?: number;
    style?: any;
}

export default function Card(props: CardProps) {
    return (
        <BaseCard
            {...props}
            style={[props.style, [{ backgroundColor: 'white' }]]}
        />
    );
}

export interface CardTitleProps {
    title: any;
    subtitle?: string;
    left?: ((props: { size: number }) => React.ReactNode) | undefined;
}

export function CardTitle(props: CardTitleProps) {
    return (
        <BaseCard.Title
            title={props.title}
            subtitle={props.subtitle}
            left={props.left}
        ></BaseCard.Title>
    );
}

export function CardHeader(props: CardTitleProps) {
    return (
        <BaseCard.Title
            title={props.title}
            subtitle={props.subtitle}
            left={props.left}
        ></BaseCard.Title>
    );
}

export interface CardContentProps {
    children: React.ReactNode;
    style?: any;
}

export function CardContent(props: CardContentProps) {
    return (
        <BaseCard.Content style={props.style}>
            <View>{props.children}</View>
        </BaseCard.Content>
    );
}

type BaseCoverProps = ImageProps;

export type CardCoverProps = BaseCoverProps;

export function CardCover(props: CardCoverProps) {
    return <BaseCard.Cover {...props} />;
}

export type CardActionsProps = {
    children: React.ReactNode;
};

export function CardActions(props: CardActionsProps) {
    return <BaseCard.Actions {...props} />;
}
