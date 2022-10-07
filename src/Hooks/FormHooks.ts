import useNotify from '@modules/_shared/domain/hooks/use-notify';

export const ExistInFieldErrors = (field: any, fieldsError: any) => {
    // console.log("filed=>", field, fieldsError.filter((item: any) => item === field).length > 0 ? true : false)
    return fieldsError.filter((item: any) => item === field).length > 0
        ? true
        : false;
};

export const ErrorHooksForm = (error: string) => {
    const notify = useNotify();

    switch (error) {
        case 'email already exists':
            notify('Este email ya esta registrado', 'warning');
            break;
        case 'user_already_exists':
            notify('Este usuario ya esta registrado', 'warning');
            break;
    }
    console.log(
        '🚀 ~ file: FormHooks.ts ~ line 7 ~ ErrorHooksForm ~ error',
        error
    );
    // switch (error) {
    //     case 'user_already_exists':
    //         return 'El usuario ya existe';
    //     case 'email_already_exists':
    //         return 'El correo ya existe';

    // }
};

export const profileAvatar =
    'https://firebasestorage.googleapis.com/v0/b/citybcolombiadev.appspot.com/o/avatar.png?alt=media&token=a20cee07-3752-42b7-8fd7-8e7b1ceeb68b';

export const prefixToIso2Country = (phonePrefix: string) => {
    let result;
    switch (phonePrefix) {
        case '+54':
            result = 'AR';
            break;
        case '54':
            result = 'AR';
            break;

        case '+56':
            result = 'CL';
            break;
        case '56':
            result = 'CL';
            break;

        case '+57':
            result = 'CO';
            break;
        case '57':
            result = 'CO';
            break;

        case '+52':
            result = 'MX';
            break;
        case '52':
            result = 'MX';
            break;

        case '+51':
            result = 'PE';
            break;
        case '51':
            result = 'PE';
            break;

        case '+598':
            result = 'UY';
            break;
        case '598':
            result = 'UY';
            break;
    }

    return result;
};


export const gendersList = [
    {
        id: 'Masculino',
        value: 'Masculino',
        label: 'Masculino',
        icon: 'man'

    },
    {
        id: 'Femenino',
        value: 'Femenino',
        label: 'Femenino',
        icon: 'woman'
    },
    {
        id: 'No me identifico',
        value: 'No me identifico',
        label: 'No me identifico',
        icon: 'genderless'
    }
]