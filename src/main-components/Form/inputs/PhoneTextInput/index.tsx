import BasePhoneTextInput, {
    BasePhoneTextInputProps
} from '@main-components/BaseInputs/BasePhoneTextInput';
import Box from '@main-components/Box';
import * as React from 'react';

export type PhoneTextInputProps = BasePhoneTextInputProps;

function PhoneTextInput({
    label,
    onBlur,
    onFocus,
    onChange,
    source,
    ref,
    meta,
    error,
    onChangeNumber,
    ...rest
}: PhoneTextInputProps & {
    source?: string;
    ref?: any;
    meta?: any;
    onChange?: any;
    validate?: any;
}) {
    return (
        <Box mb="m">
            <BasePhoneTextInput
                /*   ref={ref} */
                onBlur={onBlur}
                onFocus={onFocus}
                onChangeNumber={onChangeNumber}
                onChangeText={(text) => {
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

PhoneTextInput.defaultProps = {};

export default PhoneTextInput;
