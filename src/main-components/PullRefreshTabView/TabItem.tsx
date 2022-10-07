import Box from '@main-components/Box';
import React from 'react';
import { FlatListProps } from 'react-native';

export default function TabItem({
    id,
    title,
    children,
    flatListProps
}: {
    id: string;
    title: any;
    children: React.ReactNode;
    flatListProps?: FlatListProps<any>;
}) {
    return <Box>{children}</Box>;
}
