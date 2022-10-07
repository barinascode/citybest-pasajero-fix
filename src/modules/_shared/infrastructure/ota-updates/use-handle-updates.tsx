import { removeAllAsyncStorageData } from '@modules/_shared/infrastructure/storage/use-clear-app-async-storage';
import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export default function useHandleUpdates() {
    const [newUpdateAvailable, setNewUpdateAvailable] = useState(false);

    useEffect(() => {
        (async () => {
            await handleAppUpdates();
        })();
    }, []);

    async function handleAppUpdates() {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await removeAllAsyncStorageData();
                await Updates.fetchUpdateAsync();
                setNewUpdateAvailable(true);
            }
        } catch (e) {
            setNewUpdateAvailable(false);
            // handle or log error
        }
    }

    return {
        newUpdateAvailable,
        reload: async () => {
            await Updates.reloadAsync();
        }
    };
}
