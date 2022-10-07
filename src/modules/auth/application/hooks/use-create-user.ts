import { registerActions } from './../../../../integration/modules/Register/store/register.slice';
import { useDispatch } from 'react-redux';
import { ServiceCreate } from './../../../../Hooks/useApiService';
import useNotify from '@shared/domain/hooks/use-notify';
import { useState } from 'react';
import UserWithCredentials from '../../domain/models/user-with-credentials';
import { useNavigation } from '@react-navigation/native';

export default function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [data, setData] = useState<any>(null);
    const notify = useNotify();
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    
    return {
        create: async (
            user: UserWithCredentials,
            callback: (credentials: any) => void
        ) => {
            setLoaded(false);
            setLoading(true);
            ServiceCreate(user, 'passengers/auth/register').then((res: any) => {
                if (res.status || res.ok) {
                    setData(data);
                    callback(user.credentials);
                    setLoaded(true);
                    setLoading(false);
                    notify('Te has registrado correctamente', 'success');
                    dispatch(
                        registerActions.updateRegisterInfo({
                            key: 'formSended',
                            value: false
                        })
                    );
                    navigate('RegisterSuccess', {
                        goBack: false
                    });
                } else {
                    setLoaded(true);
                    setLoading(false);
                    notify(res.error, 'warning');
                }
            });
            setLoading(false);
        },
        loading,
        loaded,
        data
    };
}
