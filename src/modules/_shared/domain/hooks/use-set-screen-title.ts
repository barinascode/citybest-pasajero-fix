import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect } from 'react';

export default function useSetScreenTitle(paramName?: string) {
    const { params } = useRoute();
    const { setParams, setOptions } = useNavigation();

    const name = (params as any)?.title;

    useEffect(() => {
        setParams({
            title: name
        });
        setOptions({
            title: name
        });
    }, [name]);
}
