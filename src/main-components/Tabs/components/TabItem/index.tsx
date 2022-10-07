import Box from '@main-components/Box';
import React, { ReactChild, ReactChildren } from 'react';

export interface TabItemProps {
    children: ReactChild | ReactChildren;
    key: string;
    title: string;
}

export function TabItem({ children }: TabItemProps) {
    return <Box flex={1}>{children}</Box>;
}
