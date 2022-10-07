import AuthUserRepository from '@modules/auth/domain/repositories/auth-user-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';
import { ServiceCreate } from 'Hooks/useApiService';

export default class APIAuthUserRepository
    extends CitybestAPIRepository
    implements AuthUserRepository
{
    async createUser(user: any) {
        // let user2:any = {
        //     cpassword: '123456',
        //     credentials: {
        //         cpassword: '123456',
        //         password: '123456',
        //         phone: '3166142827'
        //     },
        //     email: 'marioupc3@gmail.com',
        //     firstName: 'Mario',
        //     lastName: 'Montero',
        //     password: '123456',
        //     phone: '3166142827',
        //     profilePictureUrl: ''
        // };
        let userProcess: any = {
            email: user.email.trim(),
            credentials: {
                cpassword: user.cpassword,
                password: user.password,
                phone: user.phone
            },
            firstName: user.firstName.trim(),
            lastName: user.lastName.trim(),
            password: user.password.trim(),
            phone: user.phone.trim(),
            profilePictureUrl: user.profilePictureUrl
        };
        // console.log("🚀 ~ file: api-auth-user-repository.ts ~ line 48 ~ createUser ~ userProcess", userProcess)

        // await fetchJson(getApiUrl('passengers/auth/register'), {
        //     method: 'POST',
        //     body: JSON.stringify(userProcess)
        //     // body: objectToFormData(
        //     //     ObjectUtils.omit(
        //     //         {
        //     //             ...user,
        //     //             password: user.credentials.password,
        //     //             phone: user.credentials.phone
        //     //         },
        //     //         ['credentials']
        //     //     )
        //     // )
        // });
        // console.log('PARSE', JSON.parse(user));
        ServiceCreate(userProcess,'passengers/auth/register').then((response: any) => {
            console.log('response', response);
        });
    }

    async requestResetPassword(userEmail: string): Promise<void> {
        const data = await this.fetchJson(
            'passengers/request-change-password',
            {
                method: 'POST',
                body: {
                    email: userEmail
                }
            }
        );

        return data;
    }

    async verifyResetPasswordCode(
        userEmail: string,
        code: string
    ): Promise<boolean> {
        try {
            const data = await this.fetchJson(
                'passengers/verify-reset-password-code',
                {
                    method: 'POST',
                    body: {
                        email: userEmail,
                        code: code
                    }
                }
            );

            return data.valid;
        } catch (error:any) {
            console.log(error?.message);
            throw new Error(error?.message);
        }
    }

    async resetPassword(
        userEmail: string,
        code: string,
        password: string
    ): Promise<void> {
        const data = await this.fetchJson('passengers/change-password', {
            method: 'POST',
            body: {
                email: userEmail,
                code: code,
                password: password
            }
        });

        return data;
    }
}
