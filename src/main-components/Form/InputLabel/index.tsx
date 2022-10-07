import Box from '@main-components/Box';
import Text from '@main-components/Text';
import React from 'react';

export default function InputLabel(props: InputLabelProps) {
    return props.label ? (
        <Box mb="s">
            {typeof props.label == 'string' ? (
                <Text
                    variant="inputLabel"
                    color={props.hasError ? 'dangerMain' : 'secondaryMain'}
                    bold
                >
                    {props.label}
                </Text>
            ) : (
                props.label
            )}
        </Box>
    ) : null;
}

interface InputLabelProps {
    label?: any;
    hasError?: any;
}
