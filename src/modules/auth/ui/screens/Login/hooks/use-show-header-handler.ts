import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export default function useShowHeaderHandler() {
    const showHeader = useSharedValue(1);

    useEffect(() => {
        showHeader.value = 1;
        Keyboard.addListener('keyboardDidHide', () => {
            showHeader.value = 1;
        });
        Keyboard.addListener('keyboardDidShow', () => {
            showHeader.value = 0;
        });
    }, []);

    return showHeader;
}
