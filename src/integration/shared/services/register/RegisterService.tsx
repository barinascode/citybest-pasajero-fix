import axios from 'axios'
import getApiUrl from '@modules/_shared/infrastructure/utils/get-api-url';
import { PreRegisterPayload, PreRegisterResponse } from './Types';

const RegisterServices = {

    /*
        Passenger regular validation of registration
    */
    preRegister: ( payload: PreRegisterPayload ) => {
        const { email, phone } = payload
        const serviceUri = getApiUrl(`passengers/auth/preRegister`)
        return axios.post<PreRegisterResponse>(serviceUri, {email,phone})
    }
    
}

export default RegisterServices