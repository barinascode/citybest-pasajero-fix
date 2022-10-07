import createContext from '@modules/_shared/infrastructure/utils/context-selector';
import AuthProvider from '../services/auth-provider';

const AuthProviderContext = createContext<AuthProvider>(
    //@ts-ignore
    null
);

AuthProviderContext.displayName = 'AuthProviderContext';

export default AuthProviderContext;
