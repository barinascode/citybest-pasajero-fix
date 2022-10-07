import BaseCheckboxInput, {
    BaseCheckboxInputProps
} from '@main-components/BaseInputs/BaseCheckboxInput';
import Box from '@main-components/Box';
import { BaseInputProps } from '@main-components/Form';
import * as React from 'react';

export type CheckboxInputProps = Omit<BaseCheckboxInputProps, 'checked'> &
    BaseInputProps & {
        label?: string;
        title?: string | JSX.Element;
    };

function CheckboxInput({
    label,
    title,
    onBlur,
    onFocus,
    onChange,
    source,
    meta,
    error,
    ...rest
}: CheckboxInputProps) {
    return (
        <Box mb="s">
            <BaseCheckboxInput
                {...rest}
                title={label || (title as any)}
                onChange={onChange}
                checked={
                    //@ts-ignore
                    rest.value as boolean
                }
                error={meta?.invalid ? error : undefined}
                {...rest}
            />
        </Box>
    );
}

CheckboxInput.defaultProps = {};

export default CheckboxInput;
