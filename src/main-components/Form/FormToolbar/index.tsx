import Box from '@main-components/Box';
import React, { Children, cloneElement, ReactElement } from 'react';

export function FormToolbar(props: { onSubmit?: any; children: any }) {
    const { children, onSubmit } = props;

    return (
        <Box>
            {Children.map(
                children,
                (child: ReactElement) =>
                    child && cloneElement(child, { onSubmit })
            )}
        </Box>
    );
}
