import BaseTextInput, {
    BaseTextInputProps
} from '@main-components/BaseInputs/BaseTextInput';
import React from 'react';

interface BaseTextareaInputProps extends BaseTextInputProps {}

export default function BaseTextareaInput({
    value,
    maxLength,
    ...props
}: BaseTextareaInputProps) {
    return (
        <BaseTextInput
            {...props}
            value={value}
            multiline={true}
            maxLength={maxLength}
            style={{
                minHeight: 100,
                padding: 10,
                ...(props.style ?? {})
            }}
        />
    );
}
