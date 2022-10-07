import Box from '@main-components/Box';
import FormField from '@shared/form/FormField';
import React, { cloneElement } from 'react';

export default function FormGrid(props: any) {
    const { children, container, ...rest } = props;

    const { control, defaultValues, ...boxProps } = rest;
    return (
        <Box {...boxProps}>
            {React.Children.map(children, (child) => {
                const fieldProps = {
                    component: cloneElement(child, { control: control }),
                    control,
                    defaultValue:
                        child.props.defaultValue ||
                        (defaultValues && defaultValues[child.props.source]),
                    source: child.props.source,
                    validate: child.props.validate
                };

                return container || child.props.manual ? (
                    cloneElement(child, fieldProps)
                ) : (
                    <FormField {...fieldProps} />
                );
            })}
        </Box>
    );
}
