import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useFonts, PTSans_400Regular } from '@expo-google-fonts/pt-sans';
import AppLoading from 'expo-app-loading';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 

interface PropTyes{
    onPress?: ( payload:any )=>void;
    // icon : JSX.Element
    icon : string;
    label : string;
    value : string;
}

const GenderSelectorItem = (props:PropTyes) => {
    
    let [fontsLoaded] = useFonts({
        PTSans_400Regular
    });

    if (!fontsLoaded)
        return <AppLoading />

    return (
    <TouchableOpacity 
    style={styles.itemContainer} 
    onPress={ (props.onPress) ? () => props.onPress({
        label: props.label,
        value: props.value,
        icon: props.icon,

    }) : ()=> null }>
        <View style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
                { props.icon === 'man' && <Entypo name="man" size={25} color="#441a7b" />}
                { props.icon === 'woman' && <Ionicons name="woman" size={25} color="#441a7b" />}
                { props.icon === 'genderless' && <FontAwesome name="genderless" size={25} color="#441a7b" style={{marginLeft : 9}}/>}
            </View>
            <View style={{
                borderLeftWidth :1,
                borderStyle:'solid',
                borderLeftColor:'#441a7b',
                paddingLeft: 10
            }}>
                <Text  style={styles.itemLabel}>{props.label}</Text>
            </View>
        </View>
    </TouchableOpacity>)

    }

export default GenderSelectorItem



const styles = StyleSheet.create({
    itemContainer : {
        height : 40,
        display : 'flex',
        width: '100%',
        borderRadius: 30,
        borderStyle: 'solid',
        borderColor: '#441a7b',
        borderWidth: 1,
        justifyContent : 'center'
    },
    iconContainer:{
        marginRight : 15
    },
    buttonContainer: {
        paddingRight : 40,
        flexDirection : 'row',
        padding : 10,
        alignItems : 'center',
        
    },
    itemLabel:{
        fontFamily: 'PTSans_400Regular',
        fontSize : 16
    }
})