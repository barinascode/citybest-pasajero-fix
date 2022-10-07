import React from 'react';
import images from '@modules/_shared/domain/utils/constants/images';
import { Image, StyleSheet, Text, View } from 'react-native';
import { validCountries } from 'config/Countries/types';



const flagResolver = (iso2:validCountries) => {
    switch (iso2) {
        case 'CO':
            return images.FLAGCOLOMBIA;
        case 'MX':
            return images.FLAGMEXICO;
        case 'CL':
            return images.FLAGCHILE;
        case 'PE':
            return images.FLAGPERU;
        case 'AR':
            return images.FLAGARGENTINA;
        case 'UY':
            return images.FLAGURUGUAY;
        default:"CO"
    }
}



interface PropTyes{
    iso2 : validCountries;
    width : number;
    height : number;
}



const Flags = (props : PropTyes) =>{

    const { iso2, width, height } = props;

    if(!iso2) return <></>;

    return <>
    <View>
        <Image
            source={flagResolver(iso2)}
            style={{
                width,
                height ,
                ...styles.flagImageStyle
            }}
        />
        </View>
    </>  
}


export default Flags

const styles = StyleSheet.create({
    flagImageStyle : {
        resizeMode: 'contain',
    }
})