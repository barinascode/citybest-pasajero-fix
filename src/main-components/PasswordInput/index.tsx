import BaseTextInput from '@main-components/BaseInputs/BaseTextInput';
import Box from '@main-components/Box';
import { TextInputProps } from '@main-components/Form/inputs/TextInput';
import React, { useState } from 'react';

interface PasswordInputProps extends TextInputProps {
    source?: string;
    validate?: any;
    rightIcon: Partial<TextInputProps['rightIcon']>;
    image?: string;
    isError?: boolean;
}

export default function PasswordInput(props: PasswordInputProps) {
    const [visiblePassword, setVisiblePassword] = useState(false);

    const { onChange, error, ...rest } = props;
    return (
        <Box mb="m">
            <BaseTextInput
                {...props}
                
                onChangeText={(text) => {
                    rest.filterText && onChange
                        ? (onChange as any)(rest.filterText(text))
                        : (onChange as any)(text);
                }}
                // error={error ? error : undefined}
                secureTextEntry={!visiblePassword}
                rightIcon={{
                    name: visiblePassword ? 'visibility' : 'visibility-off',
                    type: 'material',
                    size: 'm',
                    onPress: () => setVisiblePassword(!visiblePassword),
                    ...props.rightIcon
                }}
                error={props.isError}
            />
        </Box>
    );
}
