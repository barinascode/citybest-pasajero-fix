import { useContext } from 'react';
import LocalizationContext from '../context';

const useTranslate = () => {
    // const { t } = useContext(LocalizationContext);

    //return t;
    return (t: string) => t;
};

export default useTranslate;
