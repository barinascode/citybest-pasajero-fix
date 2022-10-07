import * as React from 'react';
import { Chip as BaseChip } from 'react-native-paper';
import Text from '@main-components/Text';
interface ChipProps {
    size: string;
    color: any;
    label: string;
    onPress?: () => void;
}

const Chip = (props: ChipProps) => (
    <BaseChip onPress={props.onPress}>{props.label}</BaseChip>
);

export default Chip;
