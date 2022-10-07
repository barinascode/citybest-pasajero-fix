import UserIdentity from '../models/user-identity';

export default interface AuthProvider {
    login: (params: any) => Promise<any>;
    loginWithGoogle: (accessToken: string) => Promise<any>;
    loginWithFacebook: (accessToken: string) => Promise<any>;
    loginWithApple: (accessToken: string) => Promise<any>;
    logout: (params: any) => Promise<void | false | string>;
    checkAuth: (params: any) => Promise<void | string>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params: any) => Promise<any>;
    getIdentity?: () => Promise<UserIdentity>;
    updateIdentity: (params: any) => Promise<void>;
    state: any;
    dispatch: (params: any) => {};
}
