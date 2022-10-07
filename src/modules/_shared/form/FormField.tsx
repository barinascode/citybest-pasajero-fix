import PropTypes from 'prop-types';
import * as React from 'react';
import { ControllerProps, useFormContext, Validate } from 'react-hook-form';
import useInput from './useInput';

export const isRequired = (validate: any) => {
    if (validate && validate.isRequired) {
        return true;
    }
    if (Array.isArray(validate)) {
        return !!validate.find((it) => it.isRequired);
    }
    return false;
};

interface Props
    extends Omit<
        // FieldProps<any, FieldRenderProps<any, HTMLElement>, HTMLElement>,
        ControllerProps<any, any>,
        'validate'
    > {
    component: React.ComponentType<any> | 'input' | 'select' | 'textarea';
    defaultValue?: any;
    source: string;
    validate?: Validate;
    control: any;
}

function FormField({ validate, defaultValue, control, component, ...props }:any) {
    const { id, input, isRequired, meta, ref } = useInput({
        defaultValue: defaultValue,
        validate: validate,
        source: props.source,
        control: control
    });

    const { errors } = useFormContext(); // retrieve all hook methods

    return React.cloneElement(component, {
        onChange: input.onChange,
        onBlur: input.onBlur,
        isRequired,
        meta,
        /* ref, */
        error: errors && errors[props.source] && errors[props.source].message,
        defaultValue,
        value: input.value
    });
}

FormField.propTypes = {
    defaultValue: PropTypes.any
};

export default FormField;
