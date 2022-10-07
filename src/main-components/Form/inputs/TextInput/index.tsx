import BaseTextareaInput from '@main-components/BaseInputs/BaseTextAreaInput';
import BaseTextInput, {
    BaseTextInputProps
} from '@main-components/BaseInputs/BaseTextInput';
import Box from '@main-components/Box';
import * as React from 'react';

export type TextInputProps = BaseTextInputProps;

function TextInput({
    label,
    onBlur,
    onFocus,
    onChange,
    source,
    ref,
    meta,
    error,
    multiline,
    noMargin = false,
    outlineColor = 'primaryMain',
    isError,
    ...rest
}: TextInputProps & {
    source?: string;
    ref?: any;
    meta?: any;
    onChange?: any;
    validate?: any;
    noMargin?: boolean;
    outlineColor?: string;
    error?: string;
    isError?: boolean;
}) {
    if (multiline) {
        return (
            <Box mb="m">
                <BaseTextareaInput
                    /*  ref={ref} */
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChangeText={(text) => {
                        if (!onChange) return;
                        rest.filterText
                            ? onChange(rest.filterText(text))
                            : onChange(text);
                    }}
                    error={meta?.invalid ? error : undefined}
                    label={label}
                    {...rest}
                />
            </Box>
        );
    }

    // console.log("error", isError);

    return (
        <Box {...(!noMargin && { mb: 'm' })}>
            <BaseTextInput
                /*   ref={ref} */
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeText={(text) => {
                    if (!onChange) return;
                    rest.filterText
                        ? onChange(rest.filterText(text))
                        : onChange(text);
                }}
                // error={meta?.invalid ? error : undefined}
                error={isError}
                label={label}
                {...rest}
                source={source}
            />
        </Box>
    );
}

TextInput.defaultProps = {};

export default TextInput;
