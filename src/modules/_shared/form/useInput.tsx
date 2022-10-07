import { ChangeEvent, FocusEvent, useCallback } from 'react';
import { useController, Validate, ValidateResult } from 'react-hook-form';
import isRequired from './isRequired';

export interface InputProps<T = any> extends Omit<{}, 'validate' | 'children'> {
    defaultValue?: any;
    id?: string;
    // input?: any;
    meta?: any;
    name?: string;
    onBlur?: (event: FocusEvent<T>) => void;
    onChange?: (event: ChangeEvent | any) => void;
    onFocus?: (event: FocusEvent<T>) => void;
    options?: T;
    resource?: string;
    source: string;
    validate?: Validate | Validate[];
    control: any;
}

export interface UseInputValue {
    id: string;
    isRequired: boolean;
    ref: any;
    input: {
        onChange: any;
        onBlur: any;
        name?: string;
        value?: any;
    };
    meta: {
        invalid: boolean;
        isTouched: boolean;
        isDirty: boolean;
    };
}

const useInput = ({
    defaultValue,
    id,
    name,
    source,
    validate,
    onBlur: customOnBlur,
    onChange: customOnChange,
    onFocus: customOnFocus,
    control,
    ...options
}: InputProps): UseInputValue => {
    const finalName = name || source;

    const validateFn = (props) => {
        if (!validate) return;
        if (typeof validate !== 'function') {
            const results = validate
                ?.map((vfn) => {
                    let result = vfn(props);
                    if (typeof result == 'object') {
                        result = (result as any).message;
                    }
                    return result as string;
                })
                .filter((r) => r !== undefined)
                .shift();

            const fn: Validate = () => {
                const result: ValidateResult = results;
                return result;
            };
            return fn(props);
        }

        return validate(props);
    };

    const {
        field: { ref, onBlur, onChange, value },
        meta: { invalid, isTouched, isDirty }
    } = useController({
        name: finalName,
        rules: { validate: validate ? validateFn : undefined },
        defaultValue: '',
        control: control
    });

    const handleBlur = useCallback(
        (event) => {
            onBlur();

            if (typeof customOnBlur === 'function') {
                customOnBlur(event);
            }
        },
        [onBlur, customOnBlur]
    );

    const handleChange = useCallback(
        (event) => {
            onChange(event);
            if (typeof customOnChange === 'function') {
                customOnChange(event);
            }
        },
        [onChange, customOnChange]
    );

    /*  const handleFocus = useCallback(
    (event) => {
      onFocus(event);
      if (typeof customOnFocus === "function") {
        customOnFocus(event);
      }
    },
    [onFocus, customOnFocus]
  ); */

    return {
        id: id || source,
        input: {
            name: name,
            onBlur: handleBlur,
            onChange: handleChange,
            value: value
            // onFocus: handleFocus,
        },
        meta: { invalid, isTouched, isDirty },
        isRequired: isRequired(validate),
        ref: ref
    };
};

export default useInput;
