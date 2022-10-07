import { useFormContext } from 'react-hook-form';

export default function useForm() {
    const {
        register,
        getValues,
        watch,
        control,
        formState: { isDirty },
        setValue,
        errors,
        setError,
        handleSubmit
    } = useFormContext();

    return {
        register,
        getValues,
        watch,
        control,
        setValue,
        setError,
        errors,
        handleSubmit,
        isDirty
    };
}
