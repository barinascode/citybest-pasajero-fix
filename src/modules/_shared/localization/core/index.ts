import i18n from 'i18n-js';
import memoize from 'lodash/memoize';
import { I18nManager } from 'react-native';

export const DEFAULT_LANGUAGE = 'en';

export const translationGetters: { [c: string]: any } = {
    // lazy requires (metro bundler does not support symlinks)
    en: () => require('../../../assets/locales/en/translations.json'),
    nl: () => require('../../../assets/locales/nl/translations.json')
};

export const translate = memoize(
    (key, config) => i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const t = translate;

export const setI18nConfig = (codeLang = null) => {
    // fallback if no available language fits
    const fallback = { languageTag: DEFAULT_LANGUAGE, isRTL: false };
    const lang = codeLang ? { languageTag: codeLang, isRTL: false } : null;

    const { languageTag, isRTL } = lang ? lang : fallback;

    // clear translation cache
    if (translate.cache && translate.cache.clear) {
        translate.cache.clear();
    }

    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = {
        [languageTag as string]: translationGetters[languageTag as string]()
    };

    i18n.locale = languageTag as string;

    return languageTag;
};
