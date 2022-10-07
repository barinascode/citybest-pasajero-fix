import { APP_LANG_ID, APP_LANG } from '@env';

export default function useAppDefaultLang() {
    return {
        langId: APP_LANG_ID,
        lang: APP_LANG
    };
}
