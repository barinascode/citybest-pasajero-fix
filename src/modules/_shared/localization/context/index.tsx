import React from 'react';

interface LocalizationContextProps {
    t: (scope: string, options?: any) => string;
    locale: 'en';
    setLocale: any;
}

const defaultValue: LocalizationContextProps = {
    t: (scope: string, options?: any) => {
        return '';
    },
    locale: 'en',
    setLocale: () => {}
};

const LocalizationContext = React.createContext(defaultValue);

export default LocalizationContext;
