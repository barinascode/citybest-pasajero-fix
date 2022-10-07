import useForm from '@main-components/Form/hooks/useForm';
import useInput from '@shared/form/useInput';
import React from 'react';

export default function FormInput({
    ComponentInput,
    defaultValue = '',
    source,
    ...props
}) {
    const { getValues, control, errors } = useForm();

    const { id, input, isRequired, meta, ref } = useInput({
        defaultValue: defaultValue,
        validate: props.validate,
        source: source,
        control: control
    });

    const error = errors && findError(source, errors);
    

    return (
        <ComponentInput
            {...props}
            validate={props.validate}
            defaultValue={defaultValue}
            source={source}
            onChange={input.onChange}
            onBlur={input.onBlur}
            meta={meta}
            isRequired={isRequired}
            error={error}
            value={input.value}
        />
    );
}

function findError(source, error): string | null {
    const parts = source.split('.');
    if (!error) return null;

    var newObj = error[parts[0]];
    if (parts[1]) {
        parts.splice(0, 1);
        var newString = parts.join('.');
        return findError(newString, newObj);
    }
    return newObj?.message;
}
