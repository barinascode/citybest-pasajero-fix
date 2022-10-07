import useForm from '@main-components/Form/hooks/useForm';
import PasswordInput from '@main-components/PasswordInput';
import FormField from '@shared/form/FormField';
import React from 'react';

export default function RepeatPasswordInput(props:any) {
    const { getValues } = useForm();
    const fieldProps = {
        component: (
            <PasswordInput
                label="Repetir contraseña"
                {...props}
                leftIcon={{
                    name: '',
                    size: 'm',
                    color: 'primaryMain',
                }}
                source="cpassword"
                placeholder="Repite la contraseña"
            />
        ),
        control: props.control,
        source: 'cpassword',
        validate: (value:any) => {
            const { password } = getValues();
            if (!!!value) return 'Confirma tu contraseña';
            if (value && value !== password) return 'Las claves no coinciden';
        }
    };

    return <FormField {...fieldProps} />;
}
