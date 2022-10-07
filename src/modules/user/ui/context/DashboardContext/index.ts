import createContext from '@modules/_shared/infrastructure/utils/context-selector';

export interface DashboardContextProviderProps {
    showRequestOptions: boolean;
    setShowRequestOptions: any;
    requestData: any;
    updateRequestData: any;
    showRequestModal: boolean;
    setShowRequestModal: any;
    showTripDriverCard: boolean;
    setShowTripDriverCard: any;
    preRequestData: any;
    setPreRequestData: any;
    resetRequestState: any;
    showPickLocation: boolean;
    togglePickLocation: any;
    updateOriginLocation: (data: {
        coords: any;
        address: string;
        valid?: boolean;
    }) => any;
    updateStopLocation: (data: {
        [routeIndex: string]: { coords: any; address: string; valid?: boolean };
    }) => any;
    updateFocusedInputKey: (key: string) => any;
    routeKey?: string;
    pickLocation: {
        origin?: {
            coords: any;
            address: string;
        };
        originValid?: {
            coords: any;
            address: string;
        };
        stops: {
            [stopIndex: string]: {
                coords: any;
                address: string;
            };
        };
    };
    suggestionListDismissed: boolean;
    dismissSuggestionList: any;
    showSuggestionList: boolean;
    toggleShowSuggestionList: (show: boolean) => any;
    updateSuggestionList: (options: any[]) => any;
    searchingSuggestions: boolean;
    setSearchingSuggestions: any;
    suggestionList: any;
    removeStopLocation: any;
}

const DashboardContextProvider = createContext<DashboardContextProviderProps>(
    // @ts-ignore
    null
);

DashboardContextProvider.displayName = 'DashboardContext';

export default DashboardContextProvider;
