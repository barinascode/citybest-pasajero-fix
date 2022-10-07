import React from 'react';

export interface BaseAutoCompleteSelectInputProps {
    value?: string;
    ref?: any;
    error?: string;
    onChange?: any;
    options: { name: string; id: string | number }[];
    placeholder?: string;
}

const BaseAutoCompleteSelectInput = (
    props: BaseAutoCompleteSelectInputProps
) => {
    const { ref, value, onChange, options, placeholder } = props;

    return <p></p>;
};

export default BaseAutoCompleteSelectInput;
