import { GOOGLE_MAPS_KEY } from '@env';
import LocationUtils from '@modules/_shared/domain/utils/misc/location-utils';
import axios from 'axios'


export const latLngToIso2Service = async () =>{
    
    try {
        const currentPosition = await LocationUtils.getCurrentPosition()
        const {data} = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentPosition.latitude},${currentPosition.longitude}&key=${GOOGLE_MAPS_KEY}`)
        
        const txtResponse = JSON.stringify(data)

        if(txtResponse.includes(`"Colombia"`))
            return "CO"

        if(txtResponse.includes(`"Chile"`))
            return "CL"
        
        if(txtResponse.includes(`"Peru"`))
            return "PE"

        if(txtResponse.includes(`"Argentina"`))
            return "AR"

        if(txtResponse.includes(`"Mexico"`))
            return "MX"

        if(txtResponse.includes(`"Uruguay"`))
            return "UY"

        return "CO"

    } catch (error){
        console.log(error)
    }
}