
export interface CountriesEntities {
    id:number;
    iso2Country: 'CO' | 'CL' | 'MX' | 'AR' | 'UY' | 'PE';
    longName: 'Colombia' | 'Chile' | 'Mexico' | 'Argentina' | 'Uruguay' | 'Peru';
    is_device_location: boolean;  
}

/*
    Lista de paises que se usaran en los input tipo phone
*/
const CountriesListData :CountriesEntities[] = [
    
    /* COLOMBIA*/
    {
        id: 1,
        iso2Country: 'CO',
        longName: 'Colombia',
        is_device_location: false, 
    },

    /* CHILE  */
    {
        id: 2,
        iso2Country: 'CL',
        longName: 'Chile',
        is_device_location: false,
    },


    /* MEXICO  */
    {
        id: 3,
        iso2Country: 'MX',
        longName: 'Mexico',
        is_device_location: false, 
    },
    
    
    /* ARGENTIINA*/
    {
        id: 4,
        iso2Country: 'AR',
        longName: 'Argentina',
        is_device_location: false, 
    },


    /* URUGAUAY */
    {
        id: 5,
        iso2Country: 'UY',
        longName: 'Uruguay',
        is_device_location: false, 
    },
    
    
    /* PERU */
    {
        id: 6,
        iso2Country: 'PE',
        longName: 'Peru',
        is_device_location: false, 
    }
]

export default CountriesListData