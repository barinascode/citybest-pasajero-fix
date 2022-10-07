import BaseSpinnerInput, {
    BaseSpinnerInputProps
} from '@main-components/BaseInputs/BaseSpinnerInput';
import { BaseInputProps } from '@main-components/Form';
import React, { FunctionComponent } from 'react';
export type SpinnerInputProps = Omit<BaseSpinnerInputProps, 'value'> &
    BaseInputProps;

const SpinnerInput: FunctionComponent<SpinnerInputProps> = ({
    source,
    meta,
    error,
    onChange,
    ...rest
}) => {
    return (
        <BaseSpinnerInput
            onChange={onChange}
            error={meta?.invalid ? error : undefined}
            // @ts-ignore
            value={rest.value}
            {...rest}
        />
    );
};

SpinnerInput.propTypes = {};

SpinnerInput.defaultProps = {};

export default SpinnerInput;
