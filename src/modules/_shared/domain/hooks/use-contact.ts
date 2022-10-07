import { PRIVACY_PAGE_URL, WS_PAYMENT_REPORT_CONTACT } from '@env';

export default function useContact() {
    return {
        reportContactWhatsAppNumber: WS_PAYMENT_REPORT_CONTACT,
        privacyPageUrl: PRIVACY_PAGE_URL
    };
}
