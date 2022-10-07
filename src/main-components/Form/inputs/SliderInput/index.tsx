import BaseSliderInput, {
    BaseSliderInputProps
} from '@main-components/BaseInputs/BaseSliderInput';
import { BaseInputProps } from '@main-components/Form';
import React, { FunctionComponent } from 'react';
export type SliderInputProps = Omit<BaseSliderInputProps, 'value'> &
    BaseInputProps;

const SliderInput: FunctionComponent<SliderInputProps> = ({
    source,
    meta,
    error,
    onChange,
    ...rest
}) => {
    return (
        <BaseSliderInput
            onChange={onChange}
            error={meta?.invalid ? error : undefined}
            // @ts-ignore
            value={rest.value}
            {...rest}
        />
    );
};

SliderInput.propTypes = {};

SliderInput.defaultProps = {};

export default SliderInput;
