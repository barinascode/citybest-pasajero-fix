import BaseTimeInput, {
    BaseTimeInputProps
} from '@main-components/BaseInputs/BaseTimeInput';
import Box from '@main-components/Box';
import * as React from 'react';

export type TimeInputProps = BaseTimeInputProps;

function TimeInput({
    label,
    onBlur,
    onFocus,
    onChange,
    source,
    meta,
    error,
    ...rest
}: TimeInputProps & {
    source?: string;
    ref?: any;
    meta?: any;
    onChange?: any;
    validate?: any;
}) {
    return (
        <Box mb="m" style={rest.style}>
            <BaseTimeInput
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeText={onChange}
                error={meta?.invalid ? error : undefined}
                label={label}
                {...rest}
            />
        </Box>
    );
}

TimeInput.defaultProps = {};

export default TimeInput;
