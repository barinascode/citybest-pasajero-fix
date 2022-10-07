import * as Linking from 'expo-linking';
type SocialMessage = {
    message?: string;
};

const LinkingUtils = {
    openURL(url: string, target?: string) {
        if (window && window.open) {
            window.open(url, target);
            return;
        }

        if (!Linking.canOpenURL(url)) {
            return;
        }

        Linking.openURL(url);
    },
    sendWhatsAppMessage(phoneNumber: string, payload: SocialMessage) {
        const makeUrl = () => {
            // @ts-ignore
            const baseUrl =
                // @ts-ignore
                window && window.open
                    ? `http://api.whatsapp.com/?phone=${phoneNumber}`
                    : `whatsapp://send?phone=${phoneNumber}`;

            return (
                baseUrl + (payload.message ? `&text=${payload.message}` : '')
            );
        };

        LinkingUtils.openURL(makeUrl());
    }
};

export default LinkingUtils;
