import BaseSelectPickerInput, {
    BaseSelectPickerInputProps
} from '@main-components/BaseInputs/BaseSelectPickerInput';
import React, { FunctionComponent } from 'react';
import { BaseInputProps } from '../..';
export type SelectPickerInputProps = BaseSelectPickerInputProps &
    BaseInputProps & {};

const SelectPickerInput: FunctionComponent<SelectPickerInputProps> = ({
    onChange,
    source,
    meta,
    error,
    options,
    value,
    ...rest
}) => {
    return (
        <BaseSelectPickerInput
            onChange={onChange}
            error={meta?.invalid ? error : undefined}
            options={options}
            value={value}
            {...rest}
        />
    );
};

SelectPickerInput.propTypes = {};

SelectPickerInput.defaultProps = {};

export default SelectPickerInput;
