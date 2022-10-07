import FormInput from '@main-components/Form/FormInput';
import { email } from '@shared/form/validate';
import React from 'react';
import TextInput from '../TextInput';

export default function EmailTextInput(props) {
  const propsValidation = props.validate
    ? typeof props.validate === 'object'
      ? [...props.validate]
      : [props.validate]
    : [];

  const baseValidate = [email('Correo inválido'), ...propsValidation];

  return (
    <FormInput
      {...props}
      ComponentInput={TextInput}
      keyboardType="email-address"
      autoCapitalize="none"
      validate={baseValidate}
    />
  );
}
