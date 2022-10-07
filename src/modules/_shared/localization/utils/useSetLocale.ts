import { useCallback, useContext } from 'react';
import LocalizationContext from '../context';
import { setI18nConfig } from '../core/index';

const useSetLocale = () => {
    const { t, locale, setLocale } = useContext(LocalizationContext);

    const handleLocalizationChange = useCallback(
        (newLocale) => {
            const newSetLocale = setI18nConfig(newLocale);
            setLocale(newSetLocale);
        },
        [locale]
    );

    return handleLocalizationChange;
};

export default useSetLocale;
