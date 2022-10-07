import * as Device from 'expo-device';
import Constants from 'expo-constants';

export default function useDevice() {
    return {
        isDevice: Device.isDevice,
        platform: Device.osName,
        id: Constants.deviceId
    };
}
