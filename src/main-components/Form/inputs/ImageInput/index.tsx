import BaseImageInput, {
    BaseImageInputProps
} from '@main-components/BaseInputs/BaseImageInput';
import Box from '@main-components/Box';
import { BaseInputProps, checkInputSource } from '@main-components/Form';
import useFormFieldErrors from '@main-components/Form/hooks/use-form-field-errors';
import useInput from '@modules/_shared/form/useInput';
import * as React from 'react';

export type ImageInputProps = BaseImageInputProps & BaseInputProps;

function ImageInput({
    label,
    source,
    validate,
    UploadingImage,
    ...rest

}: ImageInputProps & {
    source?: string;
    ref?: any;
    meta?: any;
    onChange?: any;
    validate?: any;
    UploadingImage?: (status: boolean,url:string) => void
}) {
    checkInputSource({ source });

    const { id, input, isRequired, meta, ref } = useInput({
        validate: validate as any,
        source: source as string
    });

    const { hasError, error } = useFormFieldErrors(source as string);

    return (
        <Box mb="m">
            <BaseImageInput
                error={hasError ? error : undefined}
                label={label}
                initialImage={input?.value}
                onChange={input.onChange}
                UploadingImage={UploadingImage}
                {...rest}
            />
        </Box>
    );
}

ImageInput.defaultProps = {};

export default ImageInput;
