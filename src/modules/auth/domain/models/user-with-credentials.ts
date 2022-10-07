import AuthCredentials from '@modules/auth/domain/models/auth-credentials';
import User from '../../../user/domain/models/user';

export default interface UserWithCredentials extends User {
    credentials: AuthCredentials;
}
