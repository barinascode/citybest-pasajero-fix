import BaseDateInput, {
    BaseDateInputProps
} from '@main-components/BaseInputs/BaseDateInput';
import Box from '@main-components/Box';
import * as React from 'react';

export type DateInputProps = BaseDateInputProps;

function DateInput({
    label,
    onBlur,
    onFocus,
    onChange,
    source,
    /*  ref, */
    meta,
    error,
    ...rest
}: DateInputProps & {
    source?: string;
    ref?: any;
    meta?: any;
    onChange?: any;
    validate?: any;
}) {
    return (
        <Box mb="m" style={rest.style}>
            <BaseDateInput
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

DateInput.defaultProps = {};

export default DateInput;
