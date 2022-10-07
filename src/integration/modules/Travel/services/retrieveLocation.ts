import * as Location from 'expo-location';

    const retrieveLocation = async () => {
        
        const {getCurrentPositionAsync} = Location 

        const location = await
            getCurrentPositionAsync({ 
                accuracy: Location.Accuracy.High
            })

        const {latitude, longitude, heading, speed} = location.coords 

        return {latitude, longitude, heading, speed}
    }

export default retrieveLocation