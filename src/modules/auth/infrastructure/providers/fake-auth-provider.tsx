export const userDataKeyName = 'adr_user_data';
export const userRoleKeyName = 'adr_user_role';
export const apiTokenName = 'adr_user_token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthProvider from '../../domain/services/auth-provider';

enum AuthError {
    USER_NOT_FOUND = 2
}

const FakeAuthProvider: Omit<AuthProvider, 'dispatch' | 'state'> = {
    login: async ({ email, password }) => {
        try {
            const token = 'myfaketoken';
            await AsyncStorage.setItem(apiTokenName, token);
            await AsyncStorage.setItem(userRoleKeyName, 'USER');
            await AsyncStorage.setItem(
                userDataKeyName,
                JSON.stringify({
                    id: 'V12345678',
                    firstName: 'EJC',
                    lastName: 'SS',
                    email: 'ejcsoftwaresolutions@gmail.com',
                    contactPhone: '12345678',
                    identificationCardType: 'V',
                    birthday: new Date(),
                    state: null
                })
            );

            return Promise.resolve(token);
        } catch (e) {
            throw e;
        }
    },
    logout: async () => {
        await AsyncStorage.removeItem(apiTokenName);
        await AsyncStorage.removeItem(userRoleKeyName);
    },
    checkError: (error) => {
        return Promise.resolve();
    },
    checkAuth: async () => {
        try {
            const value = await AsyncStorage.getItem(apiTokenName);
            if (value === null) {
                return Promise.reject();

                // throw new Error("Unauthenticated");
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

        return parsedValue;
    },
    updateIdentity: async (values: any) => {
        const value = await AsyncStorage.getItem(userDataKeyName);

        if (!value) throw new Error('Empty');

        const currentValue = JSON.parse(value);

        await AsyncStorage.setItem(
            userDataKeyName,
            JSON.stringify({ ...currentValue, ...values })
        );
    }
};

export default FakeAuthProvider;
