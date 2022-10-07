import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans';
import AppLoading from 'expo-app-loading';
import Flags from '../Flags';
import { validCountries } from 'config/Countries/types';

interface IonSelectPayload{
    iso2:validCountries;
    longName: string;
    prefix : string;
}

interface PropTyes{
    iso2 : validCountries;
    longName : string;
    prefix: string;
    onSelecItem : (payload:IonSelectPayload) => void
}

const CountrySelectorItem = (props:PropTyes) => {

    const {iso2, longName, prefix, onSelecItem} = props
    let [fontsLoaded] = useFonts({  PTSans_400Regular });
    if (!fontsLoaded) return <AppLoading />

    return (
        <TouchableOpacity 
        style={styles.itemContainer} 
        onPress={()=>{
        
            if(typeof onSelecItem != "undefined")
                props.onSelecItem({
                    iso2, 
                    longName,
                    prefix
                })
        }}>
            <View style={styles.buttonContainer}>
                <View style={styles.iconContainer}>
                    <Flags iso2={iso2} width={30} height={30} />
                </View>
                <View style={{
                    paddingLeft: 7
                }}>
                    <Text  style={styles.itemLabel}>{props.longName} ({props.prefix})</Text>
                </View>
            </View>
    </TouchableOpacity>)

    }

export default CountrySelectorItem



const styles = StyleSheet.create({
    itemContainer : {
        height : 40,
        display : 'flex',
        width: '100%',
        borderRadius: 30,
        borderStyle: 'solid',
        borderColor: '#f2f4f5',
        borderBottomWidth : 1,
        justifyContent : 'center'
    },
    iconContainer:{
        marginRight : 10
    },
    buttonContainer: {
        flexDirection : 'row',
        padding : 10,
        alignItems : 'center',
    },
    itemLabel:{
        fontFamily: 'PTSans_400Regular',
        fontSize : 16
    }
})