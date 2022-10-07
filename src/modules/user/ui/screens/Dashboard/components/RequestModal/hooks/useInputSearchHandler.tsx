import useSearchPlace from '@modules/request/application/hooks/use-search-place';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import { useEffect } from 'react';
import { useDebounce } from '../../../../../../../_shared/domain/utils/hooks/useDebounce';

export default function useInputSearchHandler({ inputName }) {
    const { search, loading } = useSearchPlace('CO');
    const {
        updateSuggestionList,
        routeKey,
        setSearchingSuggestions,
        pickLocation,
        showPickLocation
    } = useDashboardContextProvider((state) => ({
        routeKey: state.routeKey,
        showPickLocation: state.showPickLocation,
        setSearchingSuggestions: state.setSearchingSuggestions,
        updateSuggestionList: state.updateSuggestionList,
        pickLocation: state.pickLocation
    }));

    const currentValue =
        inputName === 'origin'
            ? pickLocation.origin
            : pickLocation.stops[inputName];

    const debouncedSearchTerm = useDebounce(currentValue, 500);

    useEffect(() => {
        (async () => {
            if (routeKey !== inputName) return;
            if (showPickLocation) return;
            if (debouncedSearchTerm) {
                setSearchingSuggestions(true);
                const searchResult: any[] = (
                    await search(debouncedSearchTerm.address)
                ).slice(0, 4);

                try {
                    const finalResult = await Promise.all(searchResult);

                    updateSuggestionList(finalResult);
                    setSearchingSuggestions(false);
                } catch (error) {
                    updateSuggestionList([]);

                    setSearchingSuggestions(false);
                }
            } else {
                updateSuggestionList([]);
                setSearchingSuggestions(false);
            }
        })();
    }, [debouncedSearchTerm, routeKey, inputName, showPickLocation]);
}
