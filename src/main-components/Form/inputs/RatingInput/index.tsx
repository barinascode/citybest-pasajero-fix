import BaseRatingInput, {
    BaseRatingInputProps
} from '@main-components/BaseInputs/BaseRatingInput';
import { BaseInputProps } from '@main-components/Form';
import React, { FunctionComponent } from 'react';

export type RatingInputProps = Omit<BaseRatingInputProps, 'value'> &
    BaseInputProps;

const RatingInput: FunctionComponent<RatingInputProps> = ({
    source,
    meta,
    error,
    onChange,
    ...rest
}) => {
    return (
        <BaseRatingInput
            onChange={onChange}
            error={meta?.invalid ? error : undefined}
            // @ts-ignore
            value={rest.value}
            {...rest}
        />
    );
};

RatingInput.propTypes = {};

RatingInput.defaultProps = {};

export default RatingInput;
