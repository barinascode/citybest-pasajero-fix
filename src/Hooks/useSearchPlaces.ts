import { GOOGLE_MAPS_KEY } from '@env';

export const searchPlaces = async (lat: any, long: any) => {
    try {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_MAPS_KEY}`
        );
        const json = await response.json();
        return json.results[2].formatted_address;
    } catch (error) {
        console.log(error);
    }
};

export const SearchCountryUser = async () => {
    let geocode = new Promise((resolve, reject) => {
        fetch(`https://ipapi.co/json/`)
            .then((res) => res.json())
            .then((response) => {
                resolve(response);
            })
            .catch((status) => {
                resolve(null);
            });
    });

    return geocode;
};
