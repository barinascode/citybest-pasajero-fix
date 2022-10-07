import { BaseBox as CustomBox } from '@shared/domain/utils/constants/AppTheme';
import { createBox } from '@shopify/restyle';

type BoxProps = typeof createBox.prototype;
/* 
export default function Box(props: BoxProps) {
    return (
        <BaseBox {...props} />
    )
} */

const Box = CustomBox;

export default Box;
