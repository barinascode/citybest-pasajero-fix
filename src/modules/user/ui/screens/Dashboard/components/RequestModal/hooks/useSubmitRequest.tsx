import TripRequestRepository from '@modules/request/domain/repositories/trip-request-repository';
import useDashboardContextProvider from '@modules/user/application/hooks/use-dashboard-context-provider';
import useRepository from '@modules/_shared/domain/hooks/use-repository';
import { useState } from 'react';
import { Keyboard } from 'react-native';

export default function useSubmitRequest() {
    const {
        setShowRequestOptions,
        setShowRequestModal,
        setPreRequestData,
        updateRequestData,
        pickLocation,
        togglePickLocation,
        dismissSuggestionList,
        toggleShowSuggestionList
    } = useDashboardContextProvider((state) => ({
        dismissSuggestionList: state.dismissSuggestionList,
        pickLocation: state.pickLocation,
        setShowRequestOptions: state.setShowRequestOptions,
        setShowRequestModal: state.setShowRequestModal,
        setPreRequestData: state.setPreRequestData,
        updateRequestData: state.updateRequestData,
        togglePickLocation: state.togglePickLocation,
        toggleShowSuggestionList: state.toggleShowSuggestionList
    }));

    const repo = useRepository<TripRequestRepository>('TripRequestRepository');
    const [loading, setLoading] = useState(false);

    return {
        submit: async () => {
            setLoading(true);
            Keyboard.dismiss();

            try {
                const details = {
                    origin: pickLocation.origin,
                    destination: pickLocation?.stops?.destination,
                    stops: Object.keys(pickLocation?.stops ?? {})
                        .filter((e) => e !== 'destination')
                        .map((e) => pickLocation?.stops[e])
                };

                const tripInfo = await repo.getTripInformation(
                    {
                        lat: details.origin?.coords?.latitude,
                        lng: details.origin?.coords?.longitude,
                        address: details.origin?.address ?? ''
                    },
                    {
                        lat: details.destination?.coords?.latitude,
                        lng: details.destination?.coords?.longitude,
                        address: details.destination.address ?? ''
                    }
                );

                // updateRequestData({
                //     ...details,
                //     ...tripInfo
                // });

                setPreRequestData({
                    ...tripInfo
                });

                updateRequestData({
                    origin: details.origin,
                    destination: details.destination,
                    stops: details.stops
                });

                dismissSuggestionList(true);
                setShowRequestModal(false);
                toggleShowSuggestionList(false);
                togglePickLocation(false);

                setLoading(false);
                setTimeout(() => {
                    setShowRequestOptions(true);
                }, 100);
            } catch (error) {
                setLoading(false);
            }
        },
        loading
    };
}
