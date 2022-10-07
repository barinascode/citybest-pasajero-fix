import BaseSelectInput, {
    BaseSelectInputProps
} from '@main-components/BaseInputs/BaseSelectInput';
import React, { FunctionComponent } from 'react';
import { BaseInputProps } from '../..';
export type SelectInputProps = BaseSelectInputProps & BaseInputProps & {};

const SelectInput: FunctionComponent<SelectInputProps> = ({
    onChange,
    source,
    /* ref, */
    meta,
    error,
    options,
    value,
    ...rest
}) => {
    return (
        <BaseSelectInput
            /* ref={ref} */
            onChange={onChange}
            error={meta?.invalid ? error : undefined}
            options={options}
            value={value}
            {...rest}
        />
    );
};

SelectInput.propTypes = {};

SelectInput.defaultProps = {};

export default SelectInput;
