import Button, { ButtonProps } from '@main-components/Button';
import { useUtils } from '@shared/domain/hooks/use-utils';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export interface SaveButtonProps extends Omit<ButtonProps, 'onPress'> {
    preSubmitHandler?:any
    onSubmit?: any;
    label?: string;
}

export default function SaveButton(props: SaveButtonProps) {
    const { handleSubmit, formState } = useFormContext();
    const { object } = useUtils();

    return (
        <Button
            {...object.omit(props, ['label'])}
            // onPress={props.onSubmit ? handleSubmit(props.onSubmit) : () => {}}
            onPress={()=>{
                props.preSubmitHandler && props.preSubmitHandler()
                handleSubmit(props.onSubmit)();
            }}
            title={props.label || 'Save'}
            loading={formState.isSubmitting || props.loading}
        />
    );
}

    