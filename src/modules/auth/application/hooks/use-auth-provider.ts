import AuthProviderContext from '@modules/auth/domain/contexts/auth-provider-context';
import { useContextSelector } from '@modules/_shared/infrastructure/utils/context-selector';

/**
 * Get the authProvider stored in the context
 */
export default function useAuthProvider(selector?: (state: any) => any) {
    const defaultSelector = (v) => v;

    return useContextSelector(AuthProviderContext, selector || defaultSelector);
}
