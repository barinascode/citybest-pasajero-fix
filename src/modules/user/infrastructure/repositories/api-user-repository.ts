import User from '@modules/user/domain/models/user';
import UserNotification from '@modules/user/domain/models/user-notification';
import UserRepository from '@modules/user/domain/repositories/user-repository';
import CitybestAPIRepository from '@modules/_shared/infrastructure/api/citybest-api-repository';
import objectToFormData from '@modules/_shared/infrastructure/http/transform-to-form-data';
import { prefixToIso2Country } from 'Hooks/FormHooks';

export default class APIUserRepository
    extends CitybestAPIRepository
    implements UserRepository
{
    async getProfile(): Promise<User> {
        const user = await this.fetchJson('passengers/profile', {
            method: 'GET'
        });
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            profilePictureUrl: user.profilePictureUrl,
            prefix: user.prefix,
            gender: user.gender,
            birthday: user.birthday,
            iso2:prefixToIso2Country(user.prefix)
        };
    }

    async saveProfile(user: any): Promise<void> {
        // console.log("RECIBE USER", user);
        await this.fetchJson('passengers/profile/update', {
            method: 'POST',
            body: { ...user }
        });
    }

    async GetTokenUser(): Promise<string> {
        return this.GetTokenId();
    }

    async savePushToken(token: string): Promise<void> {
        await this.fetchJson('passengers/notifications/save-token', {
            method: 'POST',
            body: {
                token: token
            }
        });
    }

    findNotifications(): Promise<UserNotification[]> {
        throw new Error('Method not implemented.');
    }
}
