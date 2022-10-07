export const userDataKeyName = 'citybest_app_user_data';
export const userRoleKeyName = 'citybest_app_user_role';
export const apiTokenName = 'citybest_app_user_token';
import UserIdentity from '@modules/auth/domain/models/user-identity';
import { fetchJson } from '@modules/_shared/infrastructure/http/fetch';
import getApiUrl from '@modules/_shared/infrastructure/utils/get-api-url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import decodeJwt from 'jwt-decode';
import AuthProvider from '../../domain/services/auth-provider';

async function saveUserSession(token: string) {
    const decodedToken: any = decodeJwt(token);

    const user = new UserIdentity({
        id: decodedToken.id,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        email: decodedToken.email,
        profilePictureUrl: decodedToken.profilePictureUrl,
        isCompleted: decodedToken.isCompleted,
        phone: decodedToken.phone
    });

    await AsyncStorage.setItem(apiTokenName, token);
    await AsyncStorage.setItem(userRoleKeyName, 'USER');
    await AsyncStorage.setItem(
        userDataKeyName,
        JSON.stringify(user.toPrimitives())
    );

    return user;
}

const APIAuthProvider: Omit<AuthProvider, 'dispatch' | 'state'> = {
    login: async ({ phone, password }) => {
        const response = await fetchJson(getApiUrl(`passengers/auth/login`), {
            method: 'POST',
            body: JSON.stringify({ phone, password })
        });

        const json: any = response.body;

        if (!!!json.token) {
            throw new Error(json.msg.toUpperCase());
        }

        try {
            const token = json.token; //"myTOken";
            const user = await saveUserSession(token);
            return Promise.resolve({ token, user: user.toPrimitives() });
        } catch (e) {
            throw e;
        }
    },
    loginWithGoogle: async (accessToken: string) => {
        const response = await fetchJson(getApiUrl(`passengers/auth/google`), {
            method: 'POST',
            body: JSON.stringify({ accessToken })
        });

        const json: any = response.body;

        if (!!!json.token) {
            throw new Error(json.msg.toUpperCase());
        }

        try {
            const token = json.token; // "myTOken";
            const user = await saveUserSession(token);

            return Promise.resolve({ token, user: user.toPrimitives() });
        } catch (e) {
            throw e;
        }
    },

    loginWithFacebook: async (accessToken: string) => {
        const response = await fetchJson(
            getApiUrl(`passengers/auth/facebook`),
            {
                method: 'POST',
                body: JSON.stringify({ accessToken })
            }
        );

        const json: any = response.body;

        if (!!!json.token) {
            throw new Error(json.msg.toUpperCase());
        }

        try {
            const token = json.token; //"myTOken";
            const user = await saveUserSession(token);

            return Promise.resolve({ token, user: user.toPrimitives() });
        } catch (e) {
            throw e;
        }
    },

    loginWithApple: async (accessToken: string) => {
        const response = await fetchJson(getApiUrl(`passengers/auth/apple`), {
            method: 'POST',
            body: JSON.stringify({ accessToken })
        });

        const json: any = response.body;

        if (!!!json.token) {
            throw new Error(json.msg.toUpperCase());
        }

        try {
            const token = json.token;
            const user = await saveUserSession(token);

            return Promise.resolve({ token, user: user.toPrimitives() });
        } catch (e) {
            throw e;
        }
    },
    logout: async () => {
        await AsyncStorage.removeItem(apiTokenName);
        await AsyncStorage.removeItem(userRoleKeyName);
        await AsyncStorage.removeItem(userDataKeyName);
    },
    checkError: (error) => {
        return Promise.resolve();
    },
    checkAuth: async () => {
        try {
            const value = await AsyncStorage.getItem(apiTokenName);
            if (value === null) {
                return Promise.reject();
            }

            return Promise.resolve(value);
        } catch (e) {
            return Promise.reject();
            // error reading value
        }
    },
    getPermissions: async () => {
        const role = await AsyncStorage.getItem(userRoleKeyName);
        return role ? role : 'guest';
    },
    getIdentity: async () => {
        const value = await AsyncStorage.getItem(userDataKeyName);

        if (!value) throw new Error('Empty');

        const parsedValue = JSON.parse(value);

        return UserIdentity.fromPrimitives(parsedValue);
    },
    updateIdentity: async (values: any) => {
        const value = await AsyncStorage.getItem(userDataKeyName);

        if (!value) throw new Error('Empty');

        const currentValue = JSON.parse(value);
        const newUserData = UserIdentity.fromPrimitives({
            ...currentValue,
            ...values
        });

        await AsyncStorage.setItem(
            userDataKeyName,
            JSON.stringify(newUserData.toPrimitives())
        );
    }
};

export default APIAuthProvider;
