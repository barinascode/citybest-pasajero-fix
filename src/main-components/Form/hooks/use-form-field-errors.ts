import { useFormContext } from 'react-hook-form';

export default function useFormFieldErrors(name: string) {
    const { errors } = useFormContext();

    const error = errors && errors[name] && errors[name].message;

    const hasError = !!error;

    return {
        hasError,
        error
    };
}
