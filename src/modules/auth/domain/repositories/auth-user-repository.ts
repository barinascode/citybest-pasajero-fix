import UserWithCredentials from '@modules/auth/domain/models/user-with-credentials';

export default interface AuthUserRepository {
    createUser(user: UserWithCredentials): Promise<void>;
    requestResetPassword(userEmail: string): Promise<void>;
    verifyResetPasswordCode(userEmail: string, code: string): Promise<boolean>;
    resetPassword(
        userEmail: string,
        code: string,
        password: string
    ): Promise<void>;
}
