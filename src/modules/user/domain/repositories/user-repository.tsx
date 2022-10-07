import User from '../models/user';
import UserNotification from '../models/user-notification';

export default interface UserRepository {
    getProfile(): Promise<User>;
    saveProfile(user: Partial<User>): Promise<void>;
    findNotifications(): Promise<UserNotification[]>;
    savePushToken(token: string): Promise<void>;
    GetTokenUser(): Promise<string>;
}
