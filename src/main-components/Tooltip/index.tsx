import Text from '@main-components/Text';
import React from 'react';

interface TooltipProps {
    text: string | JSX.Element;
}
export default function Tooltip(props: TooltipProps) {
    return <Text>Press me</Text>;
}
